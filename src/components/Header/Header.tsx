import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

export default function Header(){
    return (
        <Fragment>
            <header>
                <Navbar bg="dark" variant="dark" className="rounded-pill m-2">
                    <Container fluid className="d-flex justify-content-between align-items-stretch">
                        <Navbar.Brand as="a" href="https://eduardoromeu.github.io/" className="btn btn-dark rounded-circle me-0 d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                            </svg>
                        </Navbar.Brand>
                        <Nav className="w-100">
                            <Nav.Link as={Link} to="/repos" className="fw-semibold btn btn-dark w-100 rounded-pill">
                                <i className="bi bi-journal-bookmark me-1" />
                                Repositories
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </header>
        </Fragment>
    );
}