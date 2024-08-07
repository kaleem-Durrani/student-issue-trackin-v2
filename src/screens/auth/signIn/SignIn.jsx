import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const SignIn = () => {
  const [loginAs, setLoginAs] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate all fields are filled
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    console.log({
      loginAs,
      email,
      password,
    });

    setLoading(true);
    const response = await login(email, password, loginAs);
    setLoading(false);

    if (!response.ok) {
      console.log(response.data.error);
    }

    // Proceed with form submission logic (e.g., API call)
  };

  return (
    <Container
      fluid
      style={{ minHeight: "75vh" }}
      className="d-flex align-items-center"
    >
      <Row className="w-100">
        {/* Left Section */}
        <Col
          style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
          md={6}
          className="d-flex flex-column justify-content-center align-items-center p-5 bg-light"
        >
          <h1 className="display-4">SITS</h1>
          <h2 className="h5">Student Issue Tracking System</h2>
          <p className="mt-4">
            Welcome to the Student Issue Tracking System (SITS). This platform
            is designed to help students report and track issues related to
            their academic experience. Whether it's a problem with facilities,
            academic resources, or any other concern, SITS is here to assist.
          </p>
        </Col>

        {/* middle gap */}

        <Col md={2}></Col>

        {/* Right Section */}
        <Col
          md={4}
          className="d-flex flex-column justify-content-center align-items-center p-0"
        >
          <h2 className="mb-4">Sign In</h2>

          {/* Toggle Button Group for Selecting Login Type */}
          <ToggleButtonGroup
            type="radio"
            name="loginType"
            value={loginAs}
            onChange={(val) => setLoginAs(val)}
            className="mb-4"
          >
            <ToggleButton
              disabled={loading}
              id="tbg-radio-1"
              value={"student"}
              variant="outline-primary"
            >
              Login as Student
            </ToggleButton>
            <ToggleButton
              disabled={loading}
              id="tbg-radio-2"
              value={"admin"}
              variant="outline-secondary"
            >
              Login as Admin
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Sign In Form */}
          <Form className="w-100" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.FloatingLabel label="Email address">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
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

            <Button
              disabled={loading}
              variant="primary"
              type="submit"
              className="w-100 mb-3"
            >
              Sign In
            </Button>

            <p className="text-center">
              Don't have an account? <Link to="/signUp">Sign Up</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
