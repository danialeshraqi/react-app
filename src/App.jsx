import { Navigate, Route, Routes, useNavigate } from "react-router";
import { Login, Home, User, Post, Error404, PostList, EditUser } from "./pages";
import { Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

const ProtectedRout = ({ children }) => {
  const navigate = useNavigate();
  const pages = [
    {
      name: "Home",
      click: () => {
        navigate("/Home");
      },
    },
    {
      name: "User",
      click: () => {
        navigate("/User");
      },
    },
    {
      name: "Post",
      click: () => {
        navigate("/Post");
      },
    },
    {
      name: "Profile",
      click: () => {
        navigate("/Profile");
      },
    },
    {
      name: "Exit",
      click: () => {
        localStorage.removeItem("token");
        window.location.reload();
      },
    },
  ];

  if (!localStorage.getItem("token")) return <Navigate to="/login" />;
  else
    return (
      <>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>

              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    onClick={page.click}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <IconButton>
                  <Avatar
                    alt={localStorage.getItem("user").replace('"', "")}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {children}
      </>
    );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            !localStorage.getItem("token") ? <Login /> : <Navigate to="/home" />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRout>
              <Home />
            </ProtectedRout>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRout>
              <div className="edit">
                <div className="editcontainer">
                  <Avatar
                    style={{ width: "120px", height: "120px" }}
                    alt={localStorage.getItem("user").replace('"', "")}
                    src="/static/images/avatar/2.jpg"
                  ></Avatar>
                  <input
                    className="editcontainer__name__input"
                    value={localStorage.getItem("user")}
                    type="text"
                  />
                  <input
                    className="editcontainer__name__input"
                    value={localStorage.getItem("password")}
                    type="text"
                  />
                </div>
              </div>
            </ProtectedRout>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRout>
              <User />
            </ProtectedRout>
          }
        />
        <Route
          path="/user/:id"
          element={
            <ProtectedRout>
              <EditUser />
            </ProtectedRout>
          }
        />
        <Route
          path="/post"
          element={
            <ProtectedRout>
              <PostList />
            </ProtectedRout>
          }
        />
        <Route
          path="/post/add"
          element={
            <ProtectedRout>
              <Post />
            </ProtectedRout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
