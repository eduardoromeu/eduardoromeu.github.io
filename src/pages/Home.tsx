import React from "react";
import { Container } from "react-bootstrap";
import Repos from "./Repos";

export default function Home(){
    return (
        <Container fluid className="p-0">
            <Repos />
        </Container>
    );
}