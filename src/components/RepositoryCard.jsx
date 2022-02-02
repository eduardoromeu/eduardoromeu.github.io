import React, { Fragment, useEffect, useState } from "react";
import { Card, Button, Col, Row, Form } from "react-bootstrap";
import RepositoryCardTopics from "./RepositoryCardTopics.jsx";
import RepositoryModal from "./RepositoryModal.jsx";

export default function RepositoryCard(props) {

    const [repo, setRepo] = useState(props.repo);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setRepo(props.repo)
    }, [props]);

    if (repo === undefined) {
        return;
    }

    const hasDescription = (repo.description !== null) ? true : false;
    const showDescription = (cond) => {
        if(cond) {return "initial"} else {return "none"};
    };

    return (
        <Fragment>
            <Col sm={12} lg={6} xl={4}>
                <Card className="my-2">
                    <Card.Header className="d-flex justify-content-between">
                        <Card.Title as="a" href={repo.html_url} title={repo.html_url} className="h4 text-reset text-decoration-none m-0">
                            {repo.name}
                            <i className="bi bi-link-45deg"></i>
                        </Card.Title>
                        <a href={repo.homepage} title={repo.homepage}><i className="bi bi-house"></i></a>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group as={Row} controlId="formRepoDescription">
                                <Form.Label className="fw-bold" column sm="12" style={{display:showDescription(!hasDescription)}}>No Description</Form.Label>
                                <Form.Label className="fw-bold" column sm="4" xxl="3" style={{display:showDescription(hasDescription)}}>Description:</Form.Label>
                                <Col sm="8" style={{display:showDescription(hasDescription)}}>
                                    <Form.Control disabled plaintext readOnly defaultValue={repo.description} />
                                </Col>
                            </Form.Group>
                        </Form>
                        <hr />
                        <Button variant="outline-primary bi bi-info-circle" onClick={() => setShowModal(true)}> More Info</Button>
                        <RepositoryCardTopics topics={repo.topics} />
                    </Card.Body>
                </Card>
            </Col>

            <RepositoryModal repo={repo} show={showModal} setShowModal={setShowModal}/>
        </Fragment>
    );
}

// {repo.html_url}