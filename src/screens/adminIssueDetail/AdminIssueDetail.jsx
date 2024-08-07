import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Badge, ListGroup, Row, Col, Button } from "react-bootstrap";
import Select from "react-select";

const AdminIssueDetail = () => {
  const location = useLocation();
  const { issue } = location.state || {};

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

  // State management for the selects
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

  const handleAssign = () => {
    console.log("Assigned Issue Details:");
    console.log("Category:", selectedCategory);
    console.log("Priority:", selectedPriority);
    console.log("Department:", selectedDepartment);
    console.log("Issue:", issue);
  };

  const handleReject = () => {
    console.log("Rejected Issue Details:");
    console.log("Category:", selectedCategory);
    console.log("Priority:", selectedPriority);
    console.log("Department:", selectedDepartment);
    console.log("Issue:", issue);
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
                  {selectedPriority?.label} Priority
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
                  <strong>Category:</strong>
                  <Select
                    value={selectedCategory}
                    onChange={(option) => setSelectedCategory(option)}
                    options={categories}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Department:</strong>
                  <Select
                    value={selectedDepartment}
                    onChange={(option) => setSelectedDepartment(option)}
                    options={departments}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Priority:</strong>
                  <Select
                    value={selectedPriority}
                    onChange={(option) => setSelectedPriority(option)}
                    options={priorities}
                  />
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
          <Row className="mt-4">
            <Col className="d-flex justify-content-end">
              <Button variant="success" onClick={handleAssign} className="me-2">
                Assign
              </Button>
              <Button variant="danger" onClick={handleReject}>
                Reject
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminIssueDetail;
