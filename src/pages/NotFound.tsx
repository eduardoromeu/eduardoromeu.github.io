import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {

    return (
        <Container fluid className="p-0 text-center">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <br />
            <Link to="/"><h3>Want to go home?</h3></Link>
        </Container>
    );
}