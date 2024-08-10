import React from "react";
import { useLocation } from "react-router-dom";
import { Card, Badge, ListGroup, Row, Col } from "react-bootstrap";

const IssueDetail = () => {
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

          {/* if issue has been rejecgted or resolved and there is an issue.comment */}

          {issue?.comment && (
            <Row className="mt-4">
              <Col>
                <h5>Comment</h5>
                <p>{issue?.comment}</p>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default IssueDetail;
