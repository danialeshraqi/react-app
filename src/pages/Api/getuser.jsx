import axios from "axios";
import { useEffect, useState } from "react";

export const useGetUser = () => {
  const [user, setUsers] = useState();
  const getuser = () => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUsers(res.data);
    });
  };
  useEffect(() => {
    getuser();
  }, []);
  return user;
};
