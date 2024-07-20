import { Octokit } from "@octokit/rest";
import { request } from "@octokit/request";

const octokit = new Octokit({

    auth: "",
    userAgent: 'eduardoromeu.github.io',
    baseUrl: "https://eduardoromeu.github.io/",

    // log: {
    //     debug: () => {},
    //     info: () => {},
    //     warn: console.warn,
    //     error: console.error
    // },

}); 
(async () => {
    const result = await request("GET /orgs/{org}/repos", {
        org: "octokit",
        type: "all"
      });
      
      console.log(`${result.data.length} repos found.`);
})();
