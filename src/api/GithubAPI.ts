import axios, { AxiosResponse } from "axios";
import GithubPagination from "../interfaces/GithubPagination";
import GithubUser from "../interfaces/GithubUser";
import RepoParams from "../interfaces/RepoParams";
import { errorInterceptor } from "./interceptors/ErrorInterceptor";
import { responseInterceptor } from "./interceptors/ResponseInterceptor";

const githubApi = axios.create({
    baseURL : 'https://api.github.com/',
});

githubApi.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error)
);

/* Methods */

const getUser = async(userName: string, setUser: Function) => {
    const res: AxiosResponse = await githubApi.get(`/users/${userName}`);
    setUser(res.data);
}

const getRepos = async(user: GithubUser, setRepos: Function, params?: RepoParams, setPagination?: Function) => {
    const res: AxiosResponse = await githubApi.get(
        (user.repos_url) ? user.repos_url : `/users/${user.login}/repos`, { params }
    )
    setRepos(res.data);
    if(setPagination && res.headers.link) setPagination({
        ...formatPagination(res.headers.link),
        current: (params) ? params.page : 1
    });
}

function formatPagination(headerLinks: string): GithubPagination{
    let links: {last: string, next: string, prev: string} = {last: "", next: "", prev: ""};

    headerLinks.split(",").forEach((linkStr) => {
        switch (linkStr.slice(linkStr.indexOf('"') + 1, linkStr.lastIndexOf('"'))) {
            case "last":
                links.last = linkStr.slice(linkStr.indexOf("<") + 1, linkStr.indexOf(">"));
                break;
            case "prev":
                links.prev = linkStr.slice(linkStr.indexOf("<") + 1, linkStr.indexOf(">"));
                break;
            case "next":
                links.next = linkStr.slice(linkStr.indexOf("<") + 1, linkStr.indexOf(">"));
                break;
        }
    });

    let pagination: GithubPagination = {
        last: parseInt(links.last.slice(links.last.lastIndexOf("=") + 1)),
        prev: parseInt(links.prev.slice(links.last.lastIndexOf("=") + 1)),
        next: parseInt(links.next.slice(links.last.lastIndexOf("=") + 1)),
        current: NaN
    }

    Object.entries(pagination).forEach(entry => {
        const [key, value] = entry;
        if(isNaN(value) && (key === "last" || key === "prev" || key === "next")){
            pagination[key] = 1;
        }
    })

    return pagination;
}

export { githubApi, getUser, getRepos };