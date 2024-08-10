import React, { useEffect, useState } from "react";
import { Container, Row, Col, Pagination, Form } from "react-bootstrap";
import { useIssueList } from "../../contexts/IssueListContex";
import { useAuth } from "../../contexts/AuthContext";
import IssueCard from "./components/IssueCard";

const DepartmentAdminHome = () => {
  const {
    issueList,
    fetchIssueList,
    loading,
    isError,
    error,
    responseProblem,
    errorStatus,
  } = useIssueList();

  const { userType } = useAuth();

  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 10;

  useEffect(() => {
    if (issueList) return;
    fetchIssueList();
  }, []);

  // Filter issues based on the selected filter (status or priority)
  const filteredIssues = issueList
    ? issueList.filter((issue) => {
        if (filter === "All") return true;
        // Check if the filter matches the status or the priority
        return issue.status === filter || issue.priority === filter;
      })
    : [];

  // Pagination logic
  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = filteredIssues.slice(
    indexOfFirstIssue,
    indexOfLastIssue
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredIssues.length / issuesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationItems = () => {
    const items = [];
    const maxMiddlePages = 3;
    const maxEdgePages = 4;

    if (totalPages <= maxEdgePages + maxMiddlePages + maxEdgePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      for (let i = 1; i <= maxEdgePages; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (currentPage > maxEdgePages + 1) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }

      const middleStart = Math.max(currentPage - 1, maxEdgePages + 1);
      const middleEnd = Math.min(currentPage + 1, totalPages - maxEdgePages);
      for (let i = middleStart; i <= middleEnd; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (currentPage < totalPages - maxEdgePages - 1) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }

      for (let i = totalPages - maxEdgePages + 1; i <= totalPages; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    }

    return items;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        Error: {errorStatus} - {responseProblem} - {error}
      </div>
    );
  }

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Welcome, {userType}</h1>
        </Col>
      </Row>

      {/* Filter Radio Buttons */}
      <Row className="mb-3">
        {/* <Col md={3}></Col> */}
        <Col
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
          md={12}
        >
          <Form>
            <Form.Check
              inline
              label="All"
              type="radio"
              value="All"
              checked={filter === "All"}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            />
            <Form.Check
              inline
              label="Pending"
              type="radio"
              value="Pending"
              checked={filter === "Pending"}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Form.Check
              inline
              label="Assigned"
              type="radio"
              value="Assigned"
              checked={filter === "Assigned"}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Form.Check
              inline
              label="In Progress"
              type="radio"
              value="In Progress"
              checked={filter === "In Progress"}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Form.Check
              inline
              label="Resolved"
              type="radio"
              value="Resolved"
              checked={filter === "Resolved"}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Form.Check
              inline
              label="Rejected"
              type="radio"
              value="Rejected"
              checked={filter === "Rejected"}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Form.Check
              inline
              label="High"
              type="radio"
              value="High"
              checked={filter === "High"}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Form.Check
              inline
              label="Medium"
              type="radio"
              value="Medium"
              checked={filter === "Medium"}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Form.Check
              inline
              label="Low"
              type="radio"
              value="Low"
              checked={filter === "Low"}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
            />
          </Form>
        </Col>
      </Row>

      {/* Display Issues */}
      <Row>
        {currentIssues.map((issue, index) => (
          <Col key={index} md={12} lg={6} className="mb-4">
            <IssueCard issue={issue} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      {filteredIssues.length > issuesPerPage && (
        <Row className="justify-content-center mt-4">
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {renderPaginationItems()}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Row>
      )}
    </Container>
  );
};

export default DepartmentAdminHome;
