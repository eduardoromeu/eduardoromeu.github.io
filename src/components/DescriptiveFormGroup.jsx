import React from 'react';
import { Form, Row, Col } from "react-bootstrap";

export default function DescriptiveFormGroup(props) {

    return (
        <Form.Group as={Row} className="border-bottom" controlId="DescriptiveFormGroup">
            <Form.Label className="fw-bold" column sm="4" xxl="3">{props.label}</Form.Label>
            <Col sm="8">
                <Form.Control disabled plaintext readOnly defaultValue={props.value} />
            </Col>
        </Form.Group>
    );
}