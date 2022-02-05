import React from "react";
import { Container } from "react-bootstrap";
import BusinessCard from "../components/BusinessCard";
import Repos from "./Repos";

export default function Home() {
    return (
        <Container fluid>
            <BusinessCard className="mb-3 rounded" />

            <Repos className="mb-3" />
        </Container>
    );
}