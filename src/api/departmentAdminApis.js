import client from "./client";

const getDepartmentIssues = () =>
  client.get("/issue/get-department-issues", {});

const updateIsssueStatus = (issueId, status) =>
  client.put("/issue/update-issue-status", { issueId, status });

export default {
  getDepartmentIssues,
  updateIsssueStatus,
};
