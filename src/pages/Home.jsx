import React from "react";
import { Container } from "react-bootstrap";
import BusinessCard from "../components/BusinessCard";

export default function Home() {
    return (
        <Container fluid className="p-3">
            <h1>Home</h1>

            <BusinessCard />

        </Container>
    );
}