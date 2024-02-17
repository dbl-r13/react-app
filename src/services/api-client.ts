import axios,{ CanceledError,Axios, AxiosError, }  from "axios";
export default axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});
export { CanceledError,Axios, AxiosError }