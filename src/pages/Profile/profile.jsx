import { Avatar, TextField } from "@mui/material";
import { useSelector } from "react-redux";

export const Profile = () => {
  const state = useSelector((state) => state);

  return (
    <div className="edit">
      <div className="editcontainer">
        <Avatar
          style={{ width: "120px", height: "120px" }}
          alt={state.username.replace('"', "")}
          src="/static/images/avatar/2.jpg"
        ></Avatar>
        <TextField
          className="editcontainer__name__input"
          value={state.username}
          type="text"
          label="Username"
        />

        <TextField
          className="editcontainer__name__input"
          value={state.password}
          type="text"
          label="Password"
        />
      </div>
    </div>
  );
};
