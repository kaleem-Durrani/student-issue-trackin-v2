import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Badge,
  Alert,
} from "react-bootstrap";
import useApi from "../../../hooks/useApi";
import authApi from "../../../api/authApi";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";

const VerifyAccount = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { setUser, setUserType } = useAuth();

  const verifyOtpApi = useApi(authApi.verifyOtpStudent);

  const requestNewOtpApi = useApi(authApi.requestNewOtpStudent);

  // Handle OTP input change
  const handleOtpChange = (element, index) => {
    const value = element.value;
    const newOtp = [...otp];

    if (isNaN(value)) return;

    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input box if digit is entered
    if (element.nextSibling && value) {
      element.nextSibling.focus();
    }
  };

  // Handle key down event for backspace navigation
  const handleKeyDown = (element, index, event) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const newOtp = [...otp];

      // If the current input is not empty, just clear it
      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to the previous input and clear it
        newOtp[index - 1] = "";
        setOtp(newOtp);
        if (element.previousSibling) {
          element.previousSibling.focus();
        }
      }
    }
  };

  // Check if all OTP fields are filled
  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleVerifyOtp = async () => {
    console.log(otp.join("").replace(",", ""));
    await verifyOtpApi.request(otp.join("").replace(",", ""));
  };

  useEffect(() => {
    if (verifyOtpApi.data) {
      toast.success(verifyOtpApi.data.message);
      setUser(verifyOtpApi.data.user);
      setUserType(verifyOtpApi.data.userType);
      return;
      // Redirect to login page
    }
    if (verifyOtpApi.error) {
      toast.error(verifyOtpApi.error);
      return;
    }
  }, [verifyOtpApi.data, verifyOtpApi.error]);

  const handleRequestNewOtp = async () => {
    await requestNewOtpApi.request();
  };

  useEffect(() => {
    if (requestNewOtpApi.data) {
      toast.success(requestNewOtpApi.data.message);
      return;
      // Redirect to login page
    }
    if (requestNewOtpApi.error) {
      toast.error(requestNewOtpApi.error);
      return;
    }
  }, [requestNewOtpApi.data, requestNewOtpApi.error]);

  return (
    <Container className="mt-5">
      <h1 className="text-center">Welcome, Dear Student</h1>
      <div className="text-center mt-3">
        <Alert
          style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
          variant="info"
        >
          Your account status: <Badge bg="danger">Unverified</Badge>
        </Alert>
      </div>

      <Row className="mt-5">
        {/* Left Section */}
        <Col
          style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
          md={4}
          className="text-center d-flex flex-column justify-content-center bg-light p-4"
        >
          <p className="lead">
            Dear Student, your email is not verified. We have sent an OTP to
            your registered email address.
          </p>
          <p className="lead">
            If you have not received the OTP, please click the button below:
          </p>
          <Button
            disabled={verifyOtpApi.loading || requestNewOtpApi.loading}
            variant="light"
            style={{
              alignSelf: "center",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            }}
            onClick={handleRequestNewOtp}
          >
            Request Another OTP
          </Button>
        </Col>

        {/* Middle Empty Section */}
        <Col md={1}></Col>

        {/* Right Section */}
        <Col md={7} className="text-center">
          <p className="lead">Please enter your OTP here:</p>
          <Form className="d-flex justify-content-center">
            {otp.map((digit, index) => (
              <Form.Control
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e.target, index, e)}
                maxLength="1"
                className="m-1 text-center"
                style={{ width: "40px", fontSize: "24px" }}
              />
            ))}
          </Form>
          <Button
            style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
            variant="success"
            className="mt-4"
            disabled={
              !isOtpComplete || verifyOtpApi.loading || requestNewOtpApi.loading
            }
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyAccount;
