import React from 'react';
import { Container } from "react-bootstrap";

export default function PageContainer(props: any) {

    return(
        <Container fluid className="p-3">
            { props.children }
        </Container>
    );
}