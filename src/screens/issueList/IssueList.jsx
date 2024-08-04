import React, { useState } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import IssueCard from "./components/IssueCard";

const IssueList = () => {
  // Static list of issues
  const issues = [
    {
      title: "Issue 1",
      category: "Exam Issue",
      priority: "High",
      department: "Academic",
      description: "Issue with the final exam schedule.",
      createdBy: {
        name: "John Doe",
        email: "john.doe@example.com",
        cms: "CMS001",
        department: "Computer Science",
      },
      status: "Open",
      createdAt: "2024-08-01T10:30:00Z",
    },
    {
      title: "Issue 2",
      category: "Harassment",
      priority: "Medium",
      department: "Discipline",
      description: "Harassment complaint filed by a student.",
      createdBy: {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        cms: "CMS002",
        department: "Business Administration",
      },
      status: "Open",
      createdAt: "2024-08-02T12:45:00Z",
    },
    {
      title: "Issue 1",
      category: "Exam Issue",
      priority: "Low",
      department: "Academic",
      description: "Issue with the final exam schedule.",
      createdBy: {
        name: "John Doe",
        email: "john.doe@example.com",
        cms: "CMS001",
        department: "Computer Science",
      },
      status: "Open",
      createdAt: "2024-08-01T10:30:00Z",
    },
  ];

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 10;

  // Calculate the indices for slicing the issues array
  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue);

  // Calculate the total number of pages
  const totalPages = Math.ceil(issues.length / issuesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationItems = () => {
    const items = [];
    const maxMiddlePages = 3;
    const maxEdgePages = 4;

    if (totalPages <= maxEdgePages + maxMiddlePages + maxEdgePages) {
      // If total pages are less than or equal to the total pagination length, show all pages
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
      // Show the first 4 pages
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

      // Show dots if there is a gap between the first 4 pages and the middle pages
      if (currentPage > maxEdgePages + 1) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }

      // Show the 3 pages in the middle
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

      // Show dots if there is a gap between the middle pages and the last 4 pages
      if (currentPage < totalPages - maxEdgePages - 1) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }

      // Show the last 4 pages
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

  return (
    <Container>
      <Row>
        {currentIssues.map((issue, index) => (
          <Col key={index} md={12} lg={6}>
            <IssueCard issue={issue} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
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
    </Container>
  );
};

export default IssueList;
