import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Props {
  // No props needed
}

const NavbarComponent: React.FC<Props> = () => {
  return (
    <Navbar bg="danger" variant="dark" expand="lg">
      <Navbar.Brand href="index.jsp">
        <i className="fa-sharp fa-solid fa-hospital"></i> Doctor Patient Portal
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="me-auto mb-2 mb-lg-0">
          <Nav.Item>
            <Link to="index.jsp" className="nav-link active">
              <i className="fa fa-home"></i> HOME
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="doctor.jsp" className="nav-link active">
              <i className="fa-solid fa-user-doctor"></i> DOCTOR
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="view_doctor.jsp" className="nav-link active">
              <i className="fa-solid fa-list"></i> VIEW DOCTOR
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="patient.jsp" className="nav-link active">
              <i className="fa fa-wheelchair"></i> PATIENT
            </Link>
          </Nav.Item>
        </Nav>
        <div className="dropdown">
          <Button variant="light" id="dropdownMenuButton1" className="btn btn-light dropdown-toggle">
            <i className="fa fa-universal-access"></i> Admin
          </Button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item" href="../adminLogout">Logout</a>
            </li>
          </ul>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;