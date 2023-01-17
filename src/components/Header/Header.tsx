import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Navbar, Nav } from "react-bootstrap";

export default function Header(){
    return (
        <Fragment>
            <header>
                <Navbar bg="dark" variant="dark" className="rounded-pill m-1">
                    <Container fluid className="d-flex justify-content">
                        <Navbar.Brand as="a" href="https://eduardoromeu.github.io/" className="btn btn-dark rounded-circle me-0">
                            <i className="bi bi-arrow-left-short" />
                        </Navbar.Brand>
                        <Nav className="w-100">
                            <Nav.Link as={Link} to="/repos" className="fw-semibold btn btn-dark w-100 rounded-pill">
                                <i className="bi bi-journal-bookmark me-2" />
                                Repositories
                            </Nav.Link>
                            <Navbar.Brand as={Button} variant="dark" className="fw-semibold me-0 rounded-circle" disabled>
                                <i className="bi bi bi-gear-wide-connected" />
                            </Navbar.Brand>
                        </Nav>
                    </Container>
                </Navbar>
            </header>
        </Fragment>
    );
}