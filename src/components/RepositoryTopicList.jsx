import React, { useState, useEffect, Fragment } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import CollapsableCard from "./CollapsableCard";

export default function RepositoryTopicList(props) {

    const [repos, setRepos] = useState();
    const [topics, setTopics] = useState();
    const [selectedTopics, setSelectedTopics] = useState();
    // const topicColors = {default : "primary", selected : "success"};

    useEffect(() => {
        setRepos(props.repos);
    }, [props]);

    useEffect(() => {
        if (repos === undefined) return;
        let topArr = [];

        repos.forEach(repo => {
            repo.topics.forEach(topic => {
                if (!topArr.includes(topic)) {
                    topArr.push(topic);
                }
            });
        });

        setTopics(topArr);
    }, [repos]);

    useEffect(() => props.filterTopics(selectedTopics), [selectedTopics]);

    if (topics === undefined) return <Fragment></Fragment>;

    function selectTopic(topic) {
        if(selectedTopics === topic) setSelectedTopics(undefined);
        else setSelectedTopics(topic);
    }
    
    function getTopicColor(topic) {
        return (selectedTopics === topic) ? "success" : "primary";
    }

    return (
        
        <CollapsableCard title="Topics" expanded={false} border="primary" id="RepoTopics">
            <Row md="auto">
                {
                    topics.map(topic => (
                        <Col xs={12} md={true} key={topic} className="d-flex py-2">
                            <Card.Link as={Button} variant={getTopicColor(topic)} className="flex-grow-1" size="sm" onClick={() => selectTopic(topic)}>{topic}</Card.Link>
                        </Col>
                    ))
                }
            </Row>
        </CollapsableCard>
    );
}

// function selectTopic(topic) {
//     if (selectedTopics.includes(topic)) {
//         setSelectedTopics(selectedTopics.filter(tpc => tpc !== topic));
//     } else {
//         setSelectedTopics([...selectedTopics, topic]);
//     }
// }

// <Card className="border-primary m-2">
//     <Card.Header className="d-flex justify-content-between align-items-center" onClick={() => setListOpen(!listOpen)} style={{cursor:"pointer"}} data-bs-toggle="collapse" data-bs-target="#tagsCardBody" aria-expanded="false" aria-controls="tagsCardBody"> 
//         <Card.Title className="m-0">Topics</Card.Title>
//         <i className={`bi ${chevronIcon.current[listOpen]}`}></i>
//     </Card.Header>
//     <Card.Body className="collapse px-2 py-0" id="tagsCardBody">
//         <Row md="auto">
//         {
//             topics.map(topic => (
//                 <Col xs={12} md={true} key={topic} className="d-flex py-2">
//                     <Card.Link as={Button} variant={getTopicColor(topic)} className="flex-grow-1" size="sm" onClick={() => selectTopic(topic)}>{topic}</Card.Link>
//                 </Col>
//             ))
//         }
//         </Row>
//     </Card.Body>
// </Card>