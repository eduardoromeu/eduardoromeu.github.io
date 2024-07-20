import { Fragment, useState } from "react";
import { Card as BsCard, ListGroup} from "react-bootstrap";
import GithubRepository from "../../../interfaces/GithubRepository";
import Description from "./Description/Description";
import Topics from "./Topics/Topics";

interface Props {
    repo: GithubRepository
}

export default function Card({ repo }: Props) {

    const [highlight, setHighlight] = useState<boolean>();

    return (
        <Fragment>
            <BsCard className="my-2" border={highlight ? 'primary' : 'none'} onMouseEnter={() => setHighlight(true)} onMouseLeave={() => setHighlight(false)}>
                <BsCard.Header className="d-flex justify-content-between">
                    <BsCard.Title title={repo.html_url} className="m-0 text-break">
                        <a href={repo.html_url} className="h5 text-reset text-decoration-none m-0">
                            {repo.name}
                        </a>
                        <a href={repo.html_url} target="_blank" rel="noreferrer" title="Open in new tab">
                            <i className="bi bi-box-arrow-up-right ms-2 h6 text-muted"/>
                        </a>
                    </BsCard.Title>
                    
                    {
                        (repo.homepage) ?
                            <a href={repo.homepage} target="_blank" rel="noreferrer" title={`Repository's page: ${repo.homepage}`}><i className="bi bi-house text-muted"/></a>
                        : <></>
                    }

                </BsCard.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Description text={repo.description} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Topics topics={repo.topics} />
                        </ListGroup.Item>
                    </ListGroup>
            </BsCard>
        </Fragment>
    );
}