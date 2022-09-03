import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {

    if(error.message === 'Network Error'){
        return Promise.reject(new Error('Network Error.'));
    }

    // alert("Connection Error at api.ts. \r\n See console for more details.");
    console.log(error.toJSON);
    
    return Promise.reject(error);
}