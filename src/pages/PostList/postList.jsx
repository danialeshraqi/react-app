import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./postlist.scss";

export const PostList = () => {
  const [post, setPost] = useState();
  const getPost = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setPost(json));
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div className="postlistcontainer">
      <div className="postlistcontainer__postlist">
        <div className="button">
          <h1>Post LIst</h1>
          <Link to="/post/add">
            <button> + </button>
          </Link>
        </div>
        <div className="postlistcontainer__postlist__table">
          <table>
            <tr>
              <th>Body</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
            {post?.map((item) => {
              return (
                <tr>
                  <td>{item.body}</td>
                  <td>{item.title}</td>
                  <td
                    onClick={() => {
                      fetch(
                        "https://jsonplaceholder.typicode.com/posts/" + item.id,
                        {
                          method: "DELETE",
                        }
                      );
                    }}
                  >
                    Delete
                  </td>
                </tr>
              );
            })}
          </table>
          <ul></ul>
        </div>
      </div>
    </div>
  );
};
