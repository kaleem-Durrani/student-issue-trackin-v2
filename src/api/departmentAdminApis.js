import client from "./client";

const getDepartmentIssues = () =>
  client.get("/issue/get-department-issues", {});

const updateIsssueStatus = (issueId, status, comment) =>
  client.put("/issue/update-issue-status", { issueId, status, comment });

export default {
  getDepartmentIssues,
  updateIsssueStatus,
};
