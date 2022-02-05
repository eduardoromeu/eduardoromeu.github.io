import React, { useState, useEffect } from 'react';
import { getUser } from "../api/api";
import { Card, Button, Spinner, Image, Row, Col, Modal, InputGroup, FormControl, Container, Form } from 'react-bootstrap';
import { useLocation } from 'react-router';

export default function BusinessCard(props) {

    const [user, setUser] = useState();
    const [theme, setTheme] = useState("dark");
    const [bgTheme, setBgTheme] = useState("dark");
    const [textTheme, setTextTheme] = useState("light");
    const [height, setHeight] = useState("100vh");
    const [classes, setClasses] = useState(props.className);
    const [showEmbedModal, setShowEmbedModal] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setClasses(props.className);
    }, [props.className]);

    useEffect(() => {
        const searchTheme = new URLSearchParams(location.search).get('theme');
        const searchHeight = new URLSearchParams(location.search).get('height');
        getUser(setUser);
        setTheme(() => {
            if (searchTheme !== 'light' && searchTheme !== 'dark') return theme;
            else return searchTheme;
        });
        setHeight(() => {
            return (searchHeight === undefined) ? "100%" : searchHeight;
        })
    }, []);


    useEffect(() => {
        setBgTheme((theme === "dark") ? "dark" : "light");
        setTextTheme((theme === "dark") ? "light" : "dark");
    }, [theme]);

    if (user === undefined) {
        return (
            <Card bg={bgTheme} text={textTheme} className={classes} style={{ height: `${height}` }}    >
                <Card.Body className="d-flex justify-content-center">
                    <Spinner animation="border" role="status" />
                </Card.Body>
            </Card>
        );
    }

    function copyEmbed() {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(document.querySelector("#embedInput").value).then(() => {
                document.querySelector("#embedInput").select();
            });
        } else { document.execCommand("copy"); }
    }

    function changeEmbedTheme(theme){
        const embedInput = document.getElementById("embedInput");
        if(theme === "light") {
            embedInput.value = `<embed type="text/html" src="https://eduardoromeu.github.io/#/card?height=100vh&theme=light" title="${user.login}'s Card">`;
        } else {
            embedInput.value = `<embed type="text/html" src="https://eduardoromeu.github.io/#/card?height=100vh&theme=dark" title="${user.login}'s Card">`;
        }
        
    }

    return (
        <Container fluid className={`p-0 bg-${bgTheme}`} style={{ height: `${height}` }}>
            <Card bg={bgTheme} text={textTheme} className={`${classes}`} >
                <Card.Header className="d-flex justify-content-between">
                    <Card.Title as="a" href={user.html_url} className={`d-inline h5 text-${textTheme} text-decoration-none`}>
                        <i className="me-2 bi bi-github"></i>
                        {user.login}
                    </Card.Title>
                    <Button variant={bgTheme} size="sm" title="Embed this card!" onClick={() => setShowEmbedModal(true)}><i className="bi bi-code-slash"></i></Button>
                </Card.Header>
                <Card.Body className="pt-0">
                    <Row className="d-flex">
                        <Col md="auto" className="my-3 d-flex justify-content-center align-items-center">
                            <Card.Img as={Image} variant="top" roundedCircle style={{ maxWidth: 128, maxHeight: 128 }} src={user.avatar_url} />
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
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Check inline defaultChecked type="radio" name="theme-radio" id="dark-theme-radio" label="Dark theme" onChange={() => changeEmbedTheme("dark")} />
                            <Form.Check inline type="radio" name="theme-radio" id="light-theme-radio" label="Light theme" onChange={() => changeEmbedTheme("light")} />
                        </Form.Group>

                        <InputGroup className="mb-2">
                            <Button variant="outline-secondary" onClick={() => copyEmbed()}>Copy</Button>
                            <FormControl type="text" id="embedInput" defaultValue={`<embed type="text/html" src="https://eduardoromeu.github.io/#/card?height=100vh" title="${user.login}'s Card">`} />
                        </InputGroup>

                        <Form.Text className="text-muted">Please keep embed height higher than 227px for desktop and 425px for mobile</Form.Text>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => setShowEmbedModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}