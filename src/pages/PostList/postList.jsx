import { Link } from "react-router-dom";
import "./postlist.scss";
import axios from "axios";
import { Table, TableCell, TableRow } from "@mui/material";
import { usePostList } from "../Api/getPost";

export const PostList = () => {
  const post = usePostList();

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
          <Table>
            <TableRow>
              <TableCell>Body</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
            {post?.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.body}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell
                    onClick={() => {
                      axios.delete(
                        "https://jsonplaceholder.typicode.com/posts/" + item.id,
                        {}
                      );
                    }}
                  >
                    Delete
                  </TableCell>
                </TableRow>
              );
            })}
          </Table>
          <ul></ul>
        </div>
      </div>
    </div>
  );
};
