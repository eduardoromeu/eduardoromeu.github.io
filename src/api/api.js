import axios from "axios";

export const api = axios.create({
    baseURL : "https://api.github.com/users/eduardoromeu"
})

const getSomething = async(setSomething, path) => {
    try {
        const res = await api.get(path);
        setSomething(res.data);
    } catch(err) {
        console.log(err);
        alert("Connection Error at api.js");
    }
}

export const getRepos = (setRepos) => {
    getSomething(setRepos, '/repos');
}

export const getUser = async(setUser) => {
    getSomething(setUser, '');
}
