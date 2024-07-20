import { Fragment, useEffect, useState } from "react";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import PageSwitcher from "../components/RepositoryList/PageSwitcher/PageSwitcher";
import RepositoryList from "../components/RepositoryList/RepositoryList";
import GithubRepository from "../interfaces/GithubRepository";
import GithubUser from "../interfaces/GithubUser";
import * as ghApi from "../api/GithubAPI";
import GithubPagination from "../interfaces/GithubPagination";
import User from "../components/RepositoryList/User/User";

export default function Repos() {

    
    const [user, setUser] = useState<GithubUser>({});
    const [repos, setRepos] = useState<GithubRepository[]>([]);
    const [pagination, setPagination] = useState<GithubPagination>({ current: 1, last: 1, next: 1, prev: 1 });

    useEffect(() => {
        ghApi.getUser("eduardoromeu", setUser);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        ghApi.getRepos(user, setRepos, {sort: "updated", direction: "desc", page: 1}, setPagination);
    }, [user]);

    useEffect(() => {
        ghApi.getRepos(user, setRepos, {sort: "updated", direction: "desc", page: 1});
    }, [pagination, user])

    if(!Object.keys(user).length || !repos.length){
        return (
            <Container fluid className="d-flex justify-content-center p-3">
                <Spinner animation="border" role="status"  />
            </Container>
        )
    }

    return (
        <Fragment>
            <Container fluid as={Row} wrap="true">
                <Col className="mb-2" md={12} lg={4}>
                    <User user={user} setUser={setUser} />
                </Col>
                <Col className="d-flex align-items-center justify-content-center mb-2" md={12} lg={4}>
                    {/* <Filters /> */}
                </Col>
                <Col className="d-flex justify-content-end align-items-start" md={12} lg={4}>
                    <PageSwitcher {...pagination} setPagination={setPagination}  />
                </Col>
            </Container>
            <RepositoryList repos={repos} />
        </Fragment>
    )
}