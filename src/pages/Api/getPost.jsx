import axios from "axios";
import { useEffect, useState } from "react";

export const usePostList = () => {
  const [post, setPost] = useState();
  const getPost = () => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      setPost(response.data);
    });
  };
  useEffect(() => {
    getPost();
  }, []);
  return post;
};
