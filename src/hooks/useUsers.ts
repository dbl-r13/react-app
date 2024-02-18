import { useEffect, useState } from "react";
import userServices, { AxiosUser } from "../services/user-services";
import { CanceledError } from "../services/api-client";

const useUsers = () => {
    const [users, setUsers] = useState<AxiosUser[]>([]);
    const [axiosError, setAxiosError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
  
      setLoading(true);
      const {request, cancel}  = userServices.getAll<AxiosUser>();
  
      request.then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setAxiosError(err.message);
          setLoading(false);
        });
      /**.finally(() => setLoading(false));
       * All Promises have a .finally() method that can be called and is the last things that is run after the Promise is either resolved or rejected.
       *
       * IMPORTANT NOTE: The .finally() method does not work in development mode. Trying to find documentation on why but know that it does not function correctly in Development mode which is why code above is duplicated.
       *
       */
      return () => cancel();
  
      /**
       * This is a way that can be used in useEffect. The above way is just another approach to doing the same thing.
       * .then((res) => setUsers(res.data))
       * .catch((err) => setAxiosError(err.message));
       */
    }, []);
    return { users, axiosError, isLoading, setUsers, setAxiosError }
}

export default useUsers;