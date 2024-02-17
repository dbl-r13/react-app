import apiClient, { CanceledError,Axios, AxiosError, } from "./api-client";

//TODO: add AxiosUser component and make sure all things function properly once added.
  //AxiosUser Section: added on page without component created
  export interface AxiosUser {
    id: number;
    name: string;
  }

class UserService{
    getAllAxiosUsers() {
        /** const fetchUsers = async () => {
     try {
       const res = await axios.get<AxiosUser[]>(
         "https://jsonplaceholder.typicode.com/users",
         { signal: controller.signal }
         );
         setUsers(res.data);
        } catch (err) {
          if (err instanceof CanceledError) return;
          setAxiosError((err as AxiosError).message);
        }
      };
      fetchUsers();
      */

    const controller = new AbortController();

   const request = apiClient.get<AxiosUser[]>("/users", { signal: controller.signal,});
   request.then(data => console.log(data))
      return { request, cancel: () => controller.abort()
      }
    }

    addAxiosUser(newUser:AxiosUser){
       return apiClient
      .post(`/users`, newUser)
    }
    deleteAxiosUser(id: number){
      return apiClient
      .delete(`/users/${id}`)
    }
    updateAxiosUser(id:number,updatedUser: {}){
        return apiClient
        .patch(
          `/users/${id}`,
          updatedUser
        );
    }

}

export default new UserService();