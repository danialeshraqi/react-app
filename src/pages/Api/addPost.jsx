import axios from "axios";

export const addPost = ({ title, body }) => {
  axios.post("https://jsonplaceholder.typicode.com/posts", {
    title: title,
    body: body,
    userId: 1,
  });
};
