import React, { useState } from "react";
import { Navbar, Nav, Container, Modal, Button } from "react-bootstrap";
import { FaUser, FaListUl, FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrUserManager } from "react-icons/gr";
import { GoUnverified } from "react-icons/go";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            {user && !user.adminType ? (
              <Navbar.Brand
                className="d-flex align-items-center"
                as={NavLink}
                to={user && !user.adminType ? "/home" : "/"}
              >
                <PiStudentFill className="me-1" />
                <big>SIT</big>
              </Navbar.Brand>
            ) : (
              <Navbar.Brand className="d-flex align-items-center">
                <PiStudentFill className="me-1" />
                <big>SIT</big>
              </Navbar.Brand>
            )}

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {user ? (
                  <>
                    {!user.isVerified && (
                      <>
                        <Nav.Link
                          className="d-flex align-items-center"
                          as={NavLink}
                          to="/verifyAccount"
                        >
                          <GoUnverified className="me-1" />
                          <big>Verify Account</big>
                        </Nav.Link>

                        <Nav.Link
                          className="d-flex align-items-center"
                          onClick={handleLogout}
                        >
                          <FaUser className="me-1" /> <big>Logout</big>
                        </Nav.Link>
                      </>
                    )}

                    {user.isVerified && user.adminType === "mainAdmin" && (
                      <>
                        <Nav.Link
                          className="d-flex align-items-center"
                          as={NavLink}
                          to="/adminIssueList"
                        >
                          <GrUserManager className="me-1" />
                          <FaListUl className="me-1" />
                          <big>Admin Issue List</big>
                        </Nav.Link>

                        <Nav.Link
                          className="d-flex align-items-center"
                          as={NavLink}
                          to="/adminHomeScreen"
                        >
                          <LuLayoutDashboard className="me-1" />
                          <big>Admin Dashboard</big>
                        </Nav.Link>
                      </>
                    )}

                    {user.isVerified && user.adminType !== "mainAdmin" && (
                      <Nav.Link
                        className="d-flex align-items-center"
                        as={NavLink}
                        to="/departmentAdminHome"
                      >
                        <FaUser className="me-1" />
                        <big>Dept. Admin Home</big>
                      </Nav.Link>
                    )}

                    {user.isVerified && !user.adminType && (
                      <>
                        <Nav.Link
                          className="d-flex align-items-center"
                          as={NavLink}
                          to="/createIssues"
                        >
                          <FaRegEdit className="me-1" />
                          <big>Create Issues</big>
                        </Nav.Link>

                        <Nav.Link
                          className="d-flex align-items-center"
                          as={NavLink}
                          to="/issueList"
                        >
                          <FaListUl className="me-1" />
                          <big>Issues List</big>
                        </Nav.Link>
                      </>
                    )}

                    {user.isVerified && (
                      <Nav.Link
                        className="d-flex align-items-center"
                        onClick={handleLogout}
                      >
                        <FaUser className="me-1" /> <big>Logout</big>
                      </Nav.Link>
                    )}
                  </>
                ) : (
                  <Nav.Link
                    className="d-flex align-items-center"
                    as={NavLink}
                    to="/signIn"
                  >
                    <FaUser className="me-1" /> <big>Sign In</big>
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={cancelLogout} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelLogout}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
