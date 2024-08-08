import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import useApi from "../../hooks/useApi";
import studentApis from "../../api/studentApis";
import { useIssueList } from "../../contexts/IssueListContex";
import { useNavigate } from "react-router-dom";

const categories = [
  { value: "Harrasment", label: "Harrasment" },
  { value: "Exam Issue", label: "Exam Issue" },
  { value: "Teacher Behavior", label: "Teacher Behavior" },
  { value: "Focal Person Behavior", label: "Focal Person Behavior" },
  { value: "Bus Related Issue", label: "Bus Related Issue" },
  { value: "Fee Issue", label: "Fee Issue" },
  { value: "Scholarship Issue", label: "Scholarship Issue" },
  { value: "Guard Behavior", label: "Guard Behavior" },
  { value: "Attendance Issue", label: "Attendance Issue" },
  { value: "Other", label: "Other" },
];

const priorities = [
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
];

const departments = [
  { value: "Transport", label: "Transport" },
  { value: "Academic", label: "Academic" },
  { value: "Discipline", label: "Discipline" },
  { value: "Student Affairs", label: "Student Affairs" },
];

const CreateIssue = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(null);
  const [customCategory, setCustomCategory] = useState("");
  const [priority, setPriority] = useState(null);
  const [department, setDepartment] = useState(null);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const { refreshIssueList } = useIssueList();

  const createIssueApi = useApi(studentApis.createIssue);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate that all fields are filled
    if (
      !title ||
      !category ||
      (category.value === "Other" && !customCategory) ||
      !priority ||
      !department ||
      !description
    ) {
      alert("Please fill in all fields.");
      return;
    }

    console.log({
      title,
      category: category?.value,
      // customCategory: customCategory || null,
      priority: priority?.value,
      department: department?.value,
      description,
    });

    setLoading(true);
    await createIssueApi.request(
      title,
      category?.value,
      // customCategory || null,
      priority?.value,
      department?.value,
      description
    );
    setLoading(false);

    // Proceed with form submission logic (e.g., API call)
  };

  useEffect(() => {
    if (createIssueApi.data) {
      console.log(`Issue ${createIssueApi.data.message}`);
      // Reset form fields
      setTitle("");
      setCategory(null);
      setCustomCategory("");
      setPriority(null);
      setDepartment(null);
      setDescription("");

      refreshIssueList();
      navigate("/home");

      return;
    }
    if (createIssueApi.error) {
      console.log(createIssueApi.error);
      return;
    }
  }, [createIssueApi.data, createIssueApi.error]);

  return (
    <Container
      style={{ minHeight: "78vh" }}
      fluid
      className="d-flex justify-content-center align-items-center"
    >
      <Row className="w-100">
        {/* Left Section */}
        <Col
          style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
          md={4}
          className="p-5 bg-light"
        >
          <h3>Create an Issue</h3>
          <p>
            Use this form to report issues related to your academic experience.
            Please provide as much detail as possible to help us address your
            concerns.
          </p>
          <p>
            <strong>Title:</strong> Briefly summarize the issue (max 30
            characters).
          </p>
          <p>
            <strong>Category:</strong> Select the category that best describes
            the issue. If "Other" is selected, please specify.
          </p>
          <p>
            <strong>Priority:</strong> Indicate how urgent the issue is (High,
            Medium, Low).
          </p>
          <p>
            <strong>Department:</strong> Choose the department responsible for
            handling this issue.
          </p>
          <p>
            <strong>Description:</strong> Provide a detailed description of the
            issue (max 1000 characters).
          </p>
        </Col>

        {/* Middle Gap */}
        <Col md={1}></Col>

        {/* Right Section - Form */}
        <Col md={5}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.FloatingLabel label="Title">
                <Form.Control
                  disabled={loading}
                  type="text"
                  placeholder="Issue Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={30}
                  required
                />
              </Form.FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Select
                isDisabled={loading}
                isClearable={true}
                options={categories}
                placeholder="Select a category"
                value={category}
                onChange={(selectedOption) => setCategory(selectedOption)}
                required
              />
            </Form.Group>

            {category?.value === "Other" && (
              <Form.Group className="mb-3" controlId="formCustomCategory">
                <Form.FloatingLabel label="Custom Category">
                  <Form.Control
                    disabled={loading}
                    type="text"
                    placeholder="Specify your category"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    required
                  />
                </Form.FloatingLabel>
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="formPriority">
              <Form.Label>Priority</Form.Label>
              <Select
                isDisabled={loading}
                isClearable={true}
                options={priorities}
                placeholder="Select priority"
                value={priority}
                onChange={(selectedOption) => setPriority(selectedOption)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDepartment">
              <Form.Label>Concerned Department</Form.Label>
              <Select
                isDisabled={loading}
                isClearable={true}
                options={departments}
                placeholder="Select department"
                value={department}
                onChange={(selectedOption) => setDepartment(selectedOption)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.FloatingLabel label="Description">
                <Form.Control
                  disabled={loading}
                  as="textarea"
                  placeholder="Describe the issue"
                  style={{ height: "150px" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={1000}
                  required
                />
              </Form.FloatingLabel>
            </Form.Group>

            <Button
              disabled={loading}
              variant="primary"
              type="submit"
              className="w-100 mb-3"
            >
              Create Issue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateIssue;
