import axios from "axios";

export const api = axios.create({
    baseURL : "https://api.github.com/users/"
})

const getSomething = async(setSomething, path) => {
    try {
        const res = await api.get(path);
        setSomething(res.data);
    } catch(err) {
        console.log(err);
        alert(" Connection Error at api.js. \r\n See console for more details.");
    }
}

export const getRepos = (setRepos) => {
    getSomething(setRepos, 'eduardoromeu/repos');
}

export const getUser = async(setUser) => {
    getSomething(setUser, 'eduardoromeu');
}
