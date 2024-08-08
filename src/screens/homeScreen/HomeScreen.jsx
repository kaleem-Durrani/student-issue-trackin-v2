import React, { useEffect } from "react";
import { useIssueList } from "../../contexts/IssueListContex";
import IssueCard from "./components/IssueCard"; // Make sure to import IssueCard
import { Col, Row } from "react-bootstrap";

const HomeScreen = () => {
  const {
    issueList,
    fetchIssueList,
    loading,
    isError,
    error,
    responseProblem,
    errorStatus,
  } = useIssueList();

  useEffect(() => {
    if (issueList) {
      return;
    }
    fetchIssueList();
  }, []);

  // useEffect(() => {
  //   console.log(issueList);
  //   console.log(isError);
  // }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Displaying the static user information */}
      <h2>Welcome{issueList && ": " + issueList[0].createdBy.name}</h2>
      <p> {issueList && "CMS: " + issueList[0].createdBy.cms}</p>
      <p>{issueList && "Department: " + issueList[0].createdBy.department}</p>

      {/* Display loading or error messages */}
      {loading && <h2 className="text-center">Loading...</h2>}
      {isError && (
        <h3 className="text-center">
          Error: {errorStatus} - {responseProblem} - {error}
        </h3>
      )}

      {/* Display the recent issues if available */}
      {issueList && issueList.length > 0 && (
        <div>
          <h3 className="mt-5">Your recent issues:</h3>
          <Row>
            {issueList.slice(0, 5).map((issue, index) => (
              <Col key={index} md={12} lg={6}>
                <IssueCard issue={issue} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
