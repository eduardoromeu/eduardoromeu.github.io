import React, { useState, useEffect, Fragment } from 'react';
import { getUser } from "../api/api";
import { Card, Button, Spinner, Image, Row, Col, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { useLocation } from 'react-router';

export default function BusinessCard() {

    const [user, setUser] = useState();
    const [theme, setTheme] = useState("dark");
    const [bgTheme, setBgTheme] = useState("dark");
    const [textTheme, setTextTheme] = useState("light");
    const [showEmbedModal, setShowEmbedModal] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const searchTheme = new URLSearchParams(location.search).get('theme')
        getUser(setUser);
        setTheme(() => {
            if (searchTheme !== 'light' && searchTheme !== 'dark') return theme;
            else return searchTheme;
        });
    }, []);

    useEffect(() => {
        setBgTheme((theme === "dark") ? "dark" : "light");
        setTextTheme((theme === "dark") ? "light" : "dark");
    }, [theme]);

    if (user === undefined) {
        return (
            <Card bg={bgTheme} text={textTheme}>
                <Card.Body className="d-flex justify-content-center">
                    <Spinner animation="border" role="status" />
                </Card.Body>
            </Card>
        );
    }

    return (
        <Fragment>
            <Card bg={bgTheme} text={textTheme}>
                <Card.Header className="d-flex justify-content-between">
                    <Card.Title as="a" href={user.html_url} className="d-inline text-muted h5 text-decoration-none">
                        {user.login}
                        <i className="ms-2 bi bi-link-45deg"></i>
                    </Card.Title>
                    <Button variant={bgTheme} size="sm" title="Embed this card!" onClick={() => setShowEmbedModal(true)}><i className="bi bi-code-slash"></i></Button>
                </Card.Header>
                <Card.Body className="pt-0">
                    <Row className="d-flex">
                        <Col md="auto" className="my-3 d-flex justify-content-center align-items-center">
                            <Card.Img as={Image} variant="top" roundedCircle style={{ maxWidth: 128, maxHeight : 128 }} src={user.avatar_url} />
                        </Col>
                        <Col md="auto" className="my-3 d-flex flex-column justify-content-around align-items-start">
                            <Card.Title title="Name" className="d-inline">{user.name}</Card.Title>
                            <Card.Text title="Bio"> {user.bio} </Card.Text>
                            <Card.Text title="Location"><i className="me-1 bi bi-geo-alt"></i>{user.location}</Card.Text>
                        </Col>
                        <Col md="auto" className="my-3 d-flex flex-column align-items-md-end flex-fill">
                            <Button as={"a"} href="https://github.com/eduardoromeu" variant={bgTheme}><i className="bi bi-github me-2"></i>Github</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Modal show={showEmbedModal} onHide={() => setShowEmbedModal(false)} size="lg">
                <Modal.Header>
                    <Modal.Title>Embed Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <Button variant="outline-secondary" onClick={() => {
                            if(navigator.clipboard){
                                navigator.clipboard.writeText(document.querySelector("#embedInput").value).then(() => {
                                    document.querySelector("#embedInput").select();
                                });
                            } else { document.execCommand("copy"); } 
                        }}
                        >Copy</Button>
                        <FormControl type="text" id="embedInput" value={`<embed type="text/html" src="https://eduardoromeu.github.io/#/card" title="${user.login}'s Card">`} />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => setShowEmbedModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}