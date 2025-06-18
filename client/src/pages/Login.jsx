import { useEffect, useState } from "react";
import useAuth from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { login, user } = useAuth();
  useEffect(() => {
    if (user) {
      console.log("User is now logged in:", user);
    }
  }, [user]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await login(email, password);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 bg-gradient-to-br from-[#1ed5a9] to-[#01b4e4] p-6 rounded-lg"
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        className="block w-full px-4 py-2 mb-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {errors.email && (
        <p className="text-red-200 text-sm mb-2">{errors.email}</p>
      )}

      <input
        className="block w-full px-4 py-2 mb-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {errors.password && (
        <p className="text-red-200 text-sm mb-2">{errors.password}</p>
      )}

      <p className="text-white text-xs pb-4">
        Don&apos;t have an Account?{" "}
        <Link to="/register" className="text-red-400">
          Register
        </Link>
        .
      </p>
      <button className="btn bg-white px-8 py-2 rounded-full my-4">
        Login
      </button>
    </form>
  );
};

export default Login;
