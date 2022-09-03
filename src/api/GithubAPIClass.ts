import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from "axios";
import GithubUser from "../interfaces/GithubUser";
import GithubRepository from "../interfaces/GithubRepository";
import RepoParams from "../interfaces/RepoParams";

import { githubApi } from "./GithubAPI";

export default class githubAPIClass { //Se livrar da classe, passar as funções para o GithubAPI.ts

    private user: GithubUser = {};
    private userRepos: GithubRepository[] = [];
    private reposPages: {current: number, last: number, next: number, previous: number} =
    { current: 1, last: 1, next: 1, previous: 1 };

    constructor(
        public userName: string = "eduardoromeu"
    ){
        this.setUser().then(() => this.setRepos());
    }

    // private instance = axios.create({
    //     baseURL : 'https://api.github.com/',
    // });

    private async getSomething(setSomething: Function, path: string, config?: AxiosRequestConfig<{}>, setHeaders?: Function) { //Melhorar isso
        try {
            const res: AxiosResponse = await githubApi.get(path, config);
            setSomething(res.data);
            if(setHeaders) setHeaders(res.headers);
        } catch(err) {
            console.log(err);
            alert("Connection Error at api.ts. \r\n See console for more details.");
        }
    }

    public getUser(setUser: Function, userName?: string, switchUser?: boolean){
        if(switchUser && userName) this.userName = userName;
        this.setUser(userName)
        .then(async() => {
            if(setUser){
                await setUser(this.user);
            }
        })
    }

    private async setUser(userName : string = this.userName) {
        await this.getSomething(
            (usrData:any) => { this.user = usrData; },
            `${githubApi.defaults.baseURL}users/${userName}`
        );
    }

    private async setRepos(user: GithubUser = this.user, params?: RepoParams) {
        await this.getSomething(
            (reposData:any) => {
                this.userRepos = reposData;
            },
            '',
            {
                baseURL : (user.repos_url) ? user.repos_url : `${githubApi.defaults.baseURL}users/${this.userName}/repos`,
                params
            },
            (reposHeaders: AxiosResponseHeaders) => {
                if(reposHeaders["link"]){
                    this.reposPages.last = Number(reposHeaders["link"].charAt(reposHeaders["link"].lastIndexOf("page=") + 5));
                }
            }
        );
    }

    public getRepos(setRepos?: Function, user?: GithubUser, params? : RepoParams){
        this.setRepos(user, {
            type : (params?.type) ? params.type : 'all',
            sort : (params?.sort) ? params?.sort :'full_name',
            direction : (params?.direction) ? params?.direction : 'asc',
            per_page : (params?.per_page) ? params?.per_page : 30,
            page : (params?.page) ? params?.page : 1,
        })
        .then(async() => {
            if(setRepos){
                await setRepos(this.userRepos);
            }
        })
    }
}