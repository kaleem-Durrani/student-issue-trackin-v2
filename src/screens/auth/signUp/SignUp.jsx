import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useAuth } from "../../../contexts/AuthContext";

const departments = [
  { value: "Computer Science", label: "Computer Science" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Business Administration", label: "Business Administration" },
];

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cms, setCms] = useState("");
  const [department, setDepartment] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate all fields are filled
    if (
      !name ||
      !email ||
      !cms ||
      !department ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log({
      name,
      email,
      cms,
      department: department?.value,
      password,
      confirmPassword,
    });

    setLoading(true);
    const response = await signup(
      name,
      email,
      cms,
      department?.value,
      password,
      confirmPassword
    );
    setLoading(false);

    if (!response.ok) {
      console.log(response.data.error);
    }

    // Proceed with form submission logic (e.g., API call)
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
    >
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.FloatingLabel label="Name">
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.FloatingLabel label="Email">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCms">
              <Form.FloatingLabel label="CMS">
                <Form.Control
                  type="number"
                  placeholder="Enter your CMS ID"
                  value={cms}
                  onChange={(e) => setCms(e.target.value)}
                  required
                />
              </Form.FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDepartment">
              <Form.Label>Department</Form.Label>
              <Select
                isClearable={true}
                options={departments}
                placeholder="Select your department"
                value={department}
                onChange={(selectedOption) => setDepartment(selectedOption)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.FloatingLabel label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.FloatingLabel label="Confirm Password">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              Register
            </Button>

            <p className="text-center">
              Already have an account? <Link to="/signIn">Sign In</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
