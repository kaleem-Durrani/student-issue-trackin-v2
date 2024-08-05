import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUser, FaListUl, FaRegEdit } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { PiStudentFill } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrUserManager } from "react-icons/gr";
import { GoUnverified } from "react-icons/go";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center">
              <PiStudentFill className="me-1" />
              <big> SIT</big>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/verifyAccount">
                <Nav.Link className="d-flex align-items-center">
                  <GoUnverified className="me-1" />
                  <big>Verify Account</big>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/adminIssueList">
                <Nav.Link className="d-flex align-items-center">
                  <GrUserManager className="me-1" />{" "}
                  <FaListUl className="me-1" /> <big> Admin Issue List</big>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/adminHomeScreen">
                <Nav.Link className="d-flex align-items-center">
                  <LuLayoutDashboard className="me-1" />{" "}
                  <big> Admin Dashboard</big>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/createIssues">
                <Nav.Link className="d-flex align-items-center">
                  <FaRegEdit className="me-1" />
                  <big>Create Issues</big>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/issueList">
                <Nav.Link className="d-flex align-items-center">
                  <FaListUl className="me-1" /> <big> Issues List</big>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/signIn">
                <Nav.Link className="d-flex align-items-center">
                  <FaUser className="me-1" /> <big>Sign In</big>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
