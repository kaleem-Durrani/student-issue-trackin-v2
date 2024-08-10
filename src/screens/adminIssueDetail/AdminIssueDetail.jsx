import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Badge,
  ListGroup,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import Select from "react-select";
import useApi from "../../hooks/useApi";
import adminApis from "../../api/adminApis";
import { useIssueList } from "../../contexts/IssueListContex";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

const AdminIssueDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { issue } = location.state || {};
  const [comment, setComment] = useState("");

  const { refreshIssueList } = useIssueList();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(null); // 'assign' or 'reject'

  const assignIssueApi = useApi(adminApis.assignIssue);
  const rejectIssueApi = useApi(adminApis.rejectIssue);

  const categories = [
    { value: "Harrasment", label: "Harrasment" },
    { value: "Exam Issue", label: "Exam Issue" },
    { value: "Teacher Behavior", label: "Teacher Behavior" },
    { value: "Focal Person Behavior", label: "Focal Person Behavior" },
    { value: "Bus Related Issue", label: "Bus Related Issue" },
    { value: "Fee Issue", label: "Fee Issue" },
    { value: "Scholarship Issue", label: "Scholarship Issue" },
    { value: "Guard Behavior", label: "Guard Behavior" },
    { value: "Attendance Issue", label: "Attendance Issue" },
    { value: "Other", label: "Other" },
  ];

  const priorities = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  const departments = [
    { value: "Transport", label: "Transport" },
    { value: "Academic", label: "Academic" },
    { value: "Discipline", label: "Discipline" },
    { value: "Student Affairs", label: "Student Affairs" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(
    categories.find((c) => c.label === issue?.category)
  );
  const [selectedPriority, setSelectedPriority] = useState(
    priorities.find(
      (p) => p.label.toLowerCase() === issue?.priority?.toLowerCase()
    )
  );
  const [selectedDepartment, setSelectedDepartment] = useState(
    departments.find((d) => d.label === issue?.department)
  );

  const getBadgeVariant = (type, value) => {
    const variants = {
      priority: {
        High: "danger",
        Medium: "warning",
        Low: "success",
      },
      status: {
        Pending: "info",
        Assigned: "primary",
        "In Progress": "warning",
        Resolved: "success",
        Rejected: "danger",
      },
    };
    return variants[type]?.[value] || "secondary";
  };

  const handleIssueAction = async () => {
    setLoading(true);
    const apiFunc = actionType === "assign" ? assignIssueApi : rejectIssueApi;

    if (actionType === "assign") {
      await apiFunc.request(
        issue._id,
        selectedCategory?.value,
        selectedPriority?.value,
        selectedDepartment?.value
      );
    } else {
      if (comment === "") {
        toast.error("Rejection Reason is required");
        setLoading(false);
        return;
      }
      // console.log(comment);

      await apiFunc.request(issue._id, comment);
    }

    setLoading(false);
    setShowModal(false); // Close modal after action
  };

  useEffect(() => {
    if (assignIssueApi.data || rejectIssueApi.data) {
      refreshIssueList();
      navigate("/adminIssueList");
    }
  }, [assignIssueApi.data, rejectIssueApi.data]);

  useEffect(() => {
    if (assignIssueApi.error || rejectIssueApi.error) {
      console.error(`Error: ${assignIssueApi.error || rejectIssueApi.error}`);
    }
  }, [assignIssueApi.error, rejectIssueApi.error]);

  const handleShowModal = (action) => {
    setActionType(action);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formattedDate = new Date(issue?.createdAt).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="container mt-5">
      <Card className="shadow-sm">
        <Card.Header as="h4" className="text-center bg-primary text-white">
          {issue?.title}
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={8}>
              <h5>
                <Badge bg={getBadgeVariant("priority", issue?.priority)}>
                  {selectedPriority?.label} Priority
                </Badge>{" "}
                <Badge bg={getBadgeVariant("status", issue?.status)}>
                  Status: {issue?.status}
                </Badge>
              </h5>
            </Col>
            <Col md={4} className="text-md-end">
              <small className="text-muted">Created on {formattedDate}</small>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  {issue.status === "Pending" ? (
                    <>
                      <strong>Category:</strong>
                      <Select
                        value={selectedCategory}
                        onChange={(option) => setSelectedCategory(option)}
                        options={categories}
                      />
                    </>
                  ) : (
                    <>
                      <strong>Category: </strong> {issue.category}
                    </>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  {issue.status === "Pending" ? (
                    <>
                      <strong>Department:</strong>
                      <Select
                        value={selectedDepartment}
                        onChange={(option) => setSelectedDepartment(option)}
                        options={departments}
                      />
                    </>
                  ) : (
                    <>
                      <strong>Department:</strong> {issue?.department}
                    </>
                  )}
                </ListGroup.Item>

                {issue.status === "Pending" && (
                  <ListGroup.Item>
                    <strong>Priority:</strong>
                    <Select
                      value={selectedPriority}
                      onChange={(option) => setSelectedPriority(option)}
                      options={priorities}
                    />
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Created By:</strong> {issue?.createdBy.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Cms: </strong> {issue?.createdBy.cms}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {issue?.createdBy.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Department:</strong> {issue?.createdBy.department}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h5>Details</h5>
              <p>{issue?.description}</p>
            </Col>
          </Row>

          {/* if issue has been rejecgted or resolved and there is an issue.comment */}

          {issue?.comment && (
            <Row className="mt-4">
              <Col>
                <h5>Comment</h5>
                <p>{issue?.comment}</p>
              </Col>
            </Row>
          )}

          {/* if issue status is assigned */}
          {issue.status === "Pending" && (
            <Row className="mt-4">
              <Col className="text-center">
                <Button
                  variant="primary"
                  disabled={loading}
                  onClick={() => handleShowModal("assign")}
                >
                  Assign Issue
                </Button>{" "}
                <Button
                  variant="danger"
                  disabled={loading}
                  onClick={() => handleShowModal("reject")}
                >
                  Reject Issue
                </Button>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {actionType === "assign"
              ? "Confirm Assignment"
              : "Confirm Rejection"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to {actionType} this issue?</p>
          <p>
            <strong>Title:</strong> {issue?.title}
          </p>
          <p>
            <strong>Category:</strong> {selectedCategory?.label}
          </p>
          <p>
            <strong>Department:</strong> {selectedDepartment?.label}
          </p>

          {actionType === "reject" ? (
            <>
              <strong>Please write Rejection reason</strong>
              <FloatingLabel label="Comment">
                <Form.Control
                  type="text"
                  placeholder="Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </FloatingLabel>
            </>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant={actionType === "assign" ? "primary" : "danger"}
            onClick={handleIssueAction}
            disabled={loading}
          >
            {loading ? "Processing..." : `Confirm ${actionType}`}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminIssueDetail;
