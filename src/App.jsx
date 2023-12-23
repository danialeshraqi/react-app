import { Navigate, Route, Routes, useNavigate } from "react-router";
import {
  Login,
  Home,
  User,
  Post,
  Error404,
  PostList,
  EditUser,
  Profile,
} from "./pages";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Provider, useDispatch, useSelector } from "react-redux";
import { myStore } from "./redux/store";

const ProtectedRout = ({ children }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
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
        dispatch({ type: "REMOVE" });
        window.location.reload();
      },
    },
  ];
  if (!state.token) return <Navigate to="/login" />;
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
                    alt={state.username.replace('"', "")}
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
    <Provider store={myStore}>
      <div className="App">
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
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
                <Profile />
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
    </Provider>
  );
}

export default App;
