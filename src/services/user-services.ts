import apiClient from "./api-client";
import create from "./http-services"


//TODO: add AxiosUser component and make sure all things function properly once added.
  //AxiosUser Section: added on page without component created
  export interface AxiosUser {
    id: number;
    name: string;
  }


export default create('/users/')