import { Fragment, useState, useEffect } from "react";
import { Card as BsCard, Dropdown, ListGroup} from "react-bootstrap";
import GithubRepository from "../../../interfaces/GithubRepository";
import Description from "./Description/Description";
import Topics from "./Topics/Topics";
import style from './Card.module.scss';

interface Props {
    repo: GithubRepository
}

export default function Card({ repo }: Props) { //Abrir menu por clique direito

    // const [repo, setRepo] = useState<GithubRepository>(repository);
    const [highlight, setHighlight] = useState<boolean>();

    // useEffect(() => {
    //     setRepo(repo);
    // }, [repo]);

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
                    
                    <Dropdown>
                        <Dropdown.Toggle
                            as="i"
                            id="dotsDropBtn"
                            style={{cursor: 'pointer'}}
                            title="More"
                        />

                        <Dropdown.Menu>
                            {
                                (repo.homepage) ? 
                                <Dropdown.Item href={repo.homepage} title={repo.homepage}><i className="bi bi-house me-2" />Repository's page
                                </Dropdown.Item> : <></> 
                            }
                            <Dropdown.Item disabled><i className="bi bi-info-circle me-2" />More Info (soon)</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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