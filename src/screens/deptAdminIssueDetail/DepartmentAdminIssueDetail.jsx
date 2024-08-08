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
import useApi from "../../hooks/useApi";
import departmentAdminApis from "../../api/departmentAdminApis";
import { useIssueList } from "../../contexts/IssueListContex";

const DepartmentAdminIssueDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { issue } = location.state || {};

  const { refreshIssueList } = useIssueList();
  const updateIssueApi = useApi(departmentAdminApis.updateIsssueStatus);

  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(null);

  const formattedDate = new Date(issue?.createdAt).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "secondary";
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "Pending":
        return "info";
      case "Assigned":
        return "primary";
      case "In Progress":
        return "warning";
      case "Resolved":
        return "success";
      case "Rejected":
        return "danger";
      default:
        return "secondary";
    }
  };

  const handleUpdateIssue = async () => {
    if (actionType) {
      await updateIssueApi.request(issue._id, actionType);
    }
  };

  useEffect(() => {
    if (updateIssueApi.data) {
      console.log("success", updateIssueApi.data.message);
      refreshIssueList();
      navigate("/departmentAdminHome");
      return;
    }

    if (updateIssueApi.error) {
      console.log("error", updateIssueApi.error);
      return;
    }
  }, [updateIssueApi.data, updateIssueApi.error]);

  const handleShowModal = (type) => {
    setActionType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setActionType(null);
  };

  const handleConfirmAction = async () => {
    handleCloseModal();
    await handleUpdateIssue();
  };

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
                <Badge bg={getPriorityBadgeVariant(issue?.priority)}>
                  {issue?.priority} Priority
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
                  <strong>Category:</strong> {issue?.category}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Department:</strong> {issue?.department}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Status: </strong>
                  <Badge bg={getStatusBadgeVariant(issue?.status)}>
                    {issue?.status}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Created By:</strong> {issue?.createdBy.name} (
                  {issue?.createdBy.cms})
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
          <hr />
          <Row>
            <Col>
              <Card.Text>
                <strong>Description:</strong>
              </Card.Text>
              <Card.Text>{issue?.description}</Card.Text>
            </Col>
          </Row>

          <Row>
            <Col md={4} />
            <Col
              md={8}
              style={{ display: "flex", justifyContent: "flex-end", gap: 40 }}
            >
              {issue.status === "Assigned" && (
                <Button
                  onClick={() => handleShowModal("In Progress")}
                  variant="warning"
                >
                  Set In Progress
                </Button>
              )}

              {issue.status !== "Resolved" && (
                <Button
                  onClick={() => handleShowModal("Resolved")}
                  variant="success"
                >
                  Set Resolved
                </Button>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to set this issue to "{actionType}"?
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={updateIssueApi.loading}
            variant="secondary"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            disabled={updateIssueApi.loading}
            variant="primary"
            onClick={handleConfirmAction}
          >
            {updateIssueApi.loading ? "Processing..." : `Confirm`}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DepartmentAdminIssueDetail;
