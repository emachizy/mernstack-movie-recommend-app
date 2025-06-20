import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import useAuth from "./context/AuthContext.jsx";
import MovieDetails from "./pages/MovieDetails";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import ReactModal from "react-modal";

function App() {
  ReactModal.setAppElement("#root");
  const { user } = useAuth();

  return (
    <>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        {!user && <Route path="/login" element={<Login />} />}
        {!user && <Route path="/register" element={<Register />} />}
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
