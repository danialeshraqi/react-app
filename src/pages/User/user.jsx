import { useEffect, useState } from "react";

import "./user.scss";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Key } from "@mui/icons-material";
import { useGetUser } from "../Api/getuser";
import { deleteUser } from "../Api/deleteUser";

export const User = () => {
  const [open, setOpen] = useState(false);
  const [opendel, setOpendel] = useState(false);
  const [anchorEl, setAnchorEl] = useState();
  const options = ["Edit", "DELETE"];
  const ITEM_HEIGHT = 20;
  const users = useGetUser();

  const handleClose = () => {
    setOpendel(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <div className="user">
      <div className="userlist">
        <h1>User LIst</h1>
        <div className="userlist__table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            {users?.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={(event) => {
                        setAnchorEl(event.currentTarget);
                        setOpen(true);
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                  <Menu
                    className="menu"
                    id="menu"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={() => {
                      setOpen(false);
                    }}
                  >
                    <Link to={`/user/${item.id}`}>
                      <MenuItem>Edit</MenuItem>
                    </Link>

                    <MenuItem
                      onClick={() => {
                        setOpendel(true);
                        deleteUser(item.id);
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </TableRow>
              );
            })}
            <Modal
              open={opendel}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style, width: 200 }}>
                <h5 id="child-modal-title">User deleted successfully</h5>
              </Box>
            </Modal>
          </Table>
        </div>
      </div>
    </div>
  );
};
