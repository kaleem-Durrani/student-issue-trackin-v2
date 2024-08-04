import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Card, CardContent, Typography, Grid } from "@mui/material";

// Register the required components
Chart.register(ArcElement, Tooltip, Legend);

// Dummy data for issues
const staticIssues = [
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
    status: "Pending",
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
    status: "Assigned",
    createdAt: "2024-08-02T12:45:00Z",
  },
  {
    title: "Issue 3",
    category: "Bus Schedule",
    priority: "Low",
    department: "Student Affairs",
    description: "Bus schedule needs to be updated.",
    createdBy: {
      name: "Alice Smith",
      email: "alice.smith@example.com",
      cms: "CMS003",
      department: "Management",
    },
    status: "Resolved",
    createdAt: "2024-08-03T09:00:00Z",
  },
  {
    title: "Issue 4",
    category: "Bus Schedule",
    priority: "Medium",
    department: "Discipline",
    description: "Bus schedule needs to be updated.",
    createdBy: {
      name: "Alice Smith",
      email: "alice.smith@example.com",
      cms: "CMS003",
      department: "Management",
    },
    status: "In Progress",
    createdAt: "2024-08-03T09:00:00Z",
  },
  {
    title: "Issue 5",
    category: "Bus Schedule",
    priority: "Hign",
    department: "Transport",
    description: "Bus schedule needs to be updated.",
    createdBy: {
      name: "Alice Smith",
      email: "alice.smith@example.com",
      cms: "CMS003",
      department: "Management",
    },
    status: "Rejected",
    createdAt: "2024-08-03T09:00:00Z",
  },
  // Add more issues as needed...
];

const AdminHomeScreen = () => {
  // Data aggregation for the charts and cards
  const statusCounts = staticIssues.reduce((acc, issue) => {
    acc[issue.status] = (acc[issue.status] || 0) + 1;
    return acc;
  }, {});

  const departmentCounts = staticIssues.reduce((acc, issue) => {
    acc[issue.department] = (acc[issue.department] || 0) + 1;
    return acc;
  }, {});

  const priorityCounts = staticIssues.reduce((acc, issue) => {
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
          { label: "All Issues", value: staticIssues.length },
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
