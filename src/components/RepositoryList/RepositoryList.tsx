import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import GithubRepository from "../../interfaces/GithubRepository";
import Card from "./Card/Card";

interface Props {
    repos: GithubRepository[]
}

export default function RepositoryList({repos}: Props){

    const [repositories, setRepositories] = useState<GithubRepository[]>(repos);

    useEffect(() => {
        setRepositories(repos);
    }, [repos]);

    return (
        <Container fluid>
            <Row>
                {
                    repositories.map((repo) => (
                        <Col sm={12} lg={6} xl={4} key={repo.id}>
                            <Card repo={repo} />
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
}