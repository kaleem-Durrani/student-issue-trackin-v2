import client from "./client";

const getAllIssues = () => client.get("/issue/get-all-issues", {});

const assignIssue = (issueId, category, priority, department) =>
  client.put("/issue/assign-issue", {
    issueId,
    category,
    priority,
    department,
  });

const rejectIssue = (issueId, comment) =>
  client.put("/issue/reject-issue", { issueId, comment });

export default {
  getAllIssues,
  assignIssue,
  rejectIssue,
};
