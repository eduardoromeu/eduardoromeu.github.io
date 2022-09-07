import { Fragment, useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import PageSwitcher from "../components/RepositoryList/PageSwitcher/PageSwitcher";
import RepositoryList from "../components/RepositoryList/RepositoryList";
import GithubRepository from "../interfaces/GithubRepository";
import GithubUser from "../interfaces/GithubUser";
import * as ghApi from "../api/GithubAPI";
import GithubPagination from "../interfaces/GithubPagination";

export default function Repos() {

    const [user, setUser] = useState<GithubUser>({});
    const [repos, setRepos] = useState<GithubRepository[]>([]);
    const [pagination, setPagination] = useState<GithubPagination>({ current: 1, last: 1, next: 1, prev: 1 }); //fazer páginas

    useEffect(() => {
        ghApi.getUser("eduardoromeu", setUser);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        ghApi.getRepos(user, setRepos, {sort: "updated", direction: "desc", page: pagination.current}, setPagination);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        if(pagination.current > pagination.last) pagination.current = pagination.last;
        if(pagination.current < 1) pagination.current = 1;
    }, [pagination])

    useEffect(() => {
        ghApi.getRepos(user, setRepos, {sort: "updated", direction: "desc", page: pagination.current});
        setPagination({
            ...pagination,
            prev: (pagination.current > 1) ? pagination.current - 1 : 1,
            next: (pagination.current < pagination.last) ? pagination.current + 1 : pagination.last
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.current])

    if(!Object.keys(user).length || !repos.length){
        return (
            <Container fluid className="d-flex justify-content-center p-3">
                <Spinner animation="border" role="status"  />
            </Container>
        )
    }

    // console.log({...pagination});

    return (
        <Fragment>
            <PageSwitcher pagination={pagination} setPagination={setPagination}  /> {/* mudar para o RepositoryList.tsx */}
            <RepositoryList repos={repos} />
        </Fragment>
    )
}