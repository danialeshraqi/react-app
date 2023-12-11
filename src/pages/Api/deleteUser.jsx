import axios from "axios";

export const deleteUser = (id) => {
  axios.delete("https://jsonplaceholder.typicode.com/users/" + id);
};
