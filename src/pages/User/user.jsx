import { useEffect, useState } from "react";

import "./user.scss";

export const User = () => {
  const [users, setUsers] = useState();
  const getuser = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  };

  useEffect(() => {
    getuser();
  }, []);
  return (
    <div className="user">
      <div className="userlist">
        <h1>User LIst</h1>
        <div className="userlist__table">
          <table>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>mobile number</th>
              <th>Email</th>
            </tr>
            {users?.map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
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
