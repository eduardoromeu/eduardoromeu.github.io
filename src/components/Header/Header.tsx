import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

export default function Header(){
    return (
        <Fragment>
            <header>
                <Navbar bg="dark" variant="dark" expand="sm">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/">eduardoromeu.github.io</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/repos">Repositories</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </Fragment>
    );
}