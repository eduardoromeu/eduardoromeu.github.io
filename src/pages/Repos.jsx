import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getRepos } from "../api/api";
import RepositoryList from "../components/RepositoryList";
import RepositoryTopicList from "../components/RepositoryTopicList";

export default function Repos(props) {

    const [classes, setClasses] = useState(props.className);
    const [repos, setRepos] = useState();
    const [selectedTopics, setSelectedTopics] = useState([]);

    useEffect(() => {
        getRepos(setRepos);
    }, []);

    useEffect(() => {
        setClasses(props.className);
    }, [props.className]);

    const filterTopics = (selectedTopics) => {
        setSelectedTopics(selectedTopics);
    };

    return (
        <Container fluid className={"p-0 " + classes}>
            <h1>My Repositories</h1>
            <RepositoryTopicList repos={repos} filterTopics={filterTopics} />
            <RepositoryList repos={repos} selectedTopics={selectedTopics} />
        </Container>
    );
}