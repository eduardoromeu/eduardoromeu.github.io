import React, { useEffect, useState, Fragment } from "react";
import { Badge } from "react-bootstrap";

export default function RepositoryCardTopics(props) {

    const [topics, setTopics] = useState(props.topics);

    useEffect(() => {
        setTopics(props.topics)
    }, [props]);

    if (topics === undefined || topics.length === 0) {
        return (
            <Fragment>
                <hr />
                <div className="text-center">
                    <h6 className="my-0">Ooops, no topics here</h6>
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
        <hr />
        <div className="d-flex align-items-center flex-wrap">
            <h6 className="my-0">Topics:</h6>
            {
                topics.map((topic) => (
                    <Badge className="bg-primary rounded-pill ms-2" key={topic}>{topic}</Badge>
                ))
            }
        </div>
        </Fragment>
    );
}