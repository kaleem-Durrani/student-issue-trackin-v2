import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUser, FaListUl, FaRegEdit } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { PiStudentFill } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <PiStudentFill />
              SIT
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/adminIssueList">
                <Nav.Link>Admin Issue List</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/adminHomeScreen">
                <Nav.Link>
                  <LuLayoutDashboard /> Admin Dashboard
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/createIssues">
                <Nav.Link>
                  <FaRegEdit /> Create Issues
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/issueList">
                <Nav.Link>
                  <FaListUl /> Issues List
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/signIn">
                <Nav.Link>
                  <FaUser /> Sign In
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
