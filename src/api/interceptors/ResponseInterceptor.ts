import { AxiosResponse } from "axios";

export const responseInterceptor = (response: AxiosResponse) => {
    // console.log(response);
    return response;
}