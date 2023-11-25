import { Navigate, Route, Routes } from "react-router";
import { Login, Home, User, Post, Error404, PostList } from "./pages";

const ProtectedRout = ({ children }) => {
  if (!localStorage.getItem("token")) return <Navigate to="/login" />;
  else return children;
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
          path="/user"
          element={
            <ProtectedRout>
              <User />
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
            <pootectedRout>
              <Post />
            </pootectedRout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
