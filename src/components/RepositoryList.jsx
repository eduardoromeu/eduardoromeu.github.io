import React, { Fragment, useEffect, useState } from "react";
import { Spinner, Container, Row } from "react-bootstrap";
import RepositoryCard from "./RepositoryCard";

export default function RepositoryList(props) {

    const [repos, setRepos] = useState(props.repos);

    useEffect(() => {
        setRepos(props.repos)
    }, [props]);
    
    if (repos === undefined) {
        return (
            <Container fluid className="d-flex justify-content-center">
                <Spinner animation="border" role="status"  />
            </Container>
        );
    }

    function showCard(cardTopics){
        if(props.selectedTopics === undefined) return true;
        return cardTopics.includes(props.selectedTopics);
    }
    
    return (
        <Container fluid>
            <Row>
                {
                    repos.map(repo => (
                        (showCard(repo.topics)) ? <RepositoryCard repo={repo} key={repo.name}/> : <Fragment key={repo.name} />
                    ))
                }
            </Row>
        </Container>
    );
}

// function showCard(cardTopics){
//     if(props.selectedTopics.length <= 0) return true;
//     return props.selectedTopics.some(topic => cardTopics.includes(topic));
// }