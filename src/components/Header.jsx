import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function Header() {
    
    if(useLocation().pathname === '/card'){
        return(
            <Fragment></Fragment>
        );
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="sm">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">eduardoromeu.github.io</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/repos">Repositorys</Nav.Link>
                            <NavDropdown title="Projects" id="basic-nav-dropdown">
                                {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item> */}
                                {/* <NavDropdown.Divider /> */}
                                <NavDropdown.Item href="https://github.com/eduardoromeu?tab=projects">All Projects</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}