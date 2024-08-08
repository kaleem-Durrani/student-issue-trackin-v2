import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useIssueList } from "../../contexts/IssueListContex";
import IssueList from "../issueList/IssueList";

// Register the required components
Chart.register(ArcElement, Tooltip, Legend);

const AdminHomeScreen = () => {
  const {
    issueList,
    fetchIssueList,
    loading,
    isError,
    error,
    responseProblem,
    errorStatus,
  } = useIssueList();

  // Fetch the issue list only if it's not already loaded or if there's an error
  useEffect(() => {
    if (!issueList) {
      fetchIssueList();
    }
  }, []);

  // Correct dependency array for useEffect
  // useEffect(() => {
  //   if (issueList) {
  //     console.log(issueList);
  //   }
  // }, [issueList]);

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

  if (!issueList || issueList.length === 0) {
    return <h2 className="text-center">No issues found.</h2>;
  }

  // Ensure reduce functions only run when issueList is defined
  const statusCounts = issueList.reduce((acc, issue) => {
    acc[issue.status] = (acc[issue.status] || 0) + 1;
    return acc;
  }, {});

  const departmentCounts = issueList.reduce((acc, issue) => {
    acc[issue.department] = (acc[issue.department] || 0) + 1;
    return acc;
  }, {});

  const priorityCounts = issueList.reduce((acc, issue) => {
    acc[issue.priority] = (acc[issue.priority] || 0) + 1;
    return acc;
  }, {});

  // Pie chart data
  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const departmentData = {
    labels: Object.keys(departmentCounts),
    datasets: [
      {
        data: Object.values(departmentCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Issue Status Distribution
              </Typography>
              <Pie data={statusData} key={`status-chart`} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Issues by Department
              </Typography>
              <Pie data={departmentData} key={`department-chart`} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4} style={{ marginTop: "20px" }}>
        {[
          { label: "All Issues", value: issueList.length },
          { label: "Pending", value: statusCounts.Pending || 0 },
          { label: "Assigned", value: statusCounts.Assigned || 0 },
          { label: "In Progress", value: statusCounts["In Progress"] || 0 },
          { label: "Resolved", value: statusCounts.Resolved || 0 },
          { label: "Rejected", value: statusCounts.Rejected || 0 },
          { label: "Transport", value: departmentCounts.Transport || 0 },
          { label: "Academic", value: departmentCounts.Academic || 0 },
          { label: "Discipline", value: departmentCounts.Discipline || 0 },
          {
            label: "Student Affairs",
            value: departmentCounts["Student Affairs"] || 0,
          },
          { label: "High Priority", value: priorityCounts.High || 0 },
          { label: "Medium Priority", value: priorityCounts.Medium || 0 },
          { label: "Low Priority", value: priorityCounts.Low || 0 },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.label}
                </Typography>
                <Typography variant="h4" component="div">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AdminHomeScreen;
