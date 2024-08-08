import client from "./client";

const createIssue = (title, category, priority, department, description) =>
  client.post("/issue/create-issue", {
    title,
    category,
    priority,
    department,
    description,
  });

const getStudentIssues = () => client.get("/issue/get-student-issues", {});

export default {
  createIssue,
  getStudentIssues,
};
