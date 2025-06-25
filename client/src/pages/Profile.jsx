import { useState, useEffect } from "react";
import useAuth from "../context/AuthContext.jsx";
import api from "../services/api";

const ProfilePage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    message: "",
    error: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", error: "" });
    try {
      const res = await api.put("/user/profile", formData);
      localStorage.setItem("user", JSON.stringify(res.data));
      setStatus({
        loading: false,
        message: "Profile updated successfully!",
        error: "",
      });
    } catch (error) {
      setStatus({
        loading: false,
        message: "",
        error: "Something went wrong updating your profile.",
      });
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10 bg-gray-900 text-white rounded-xl shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">My Profile</h2>

      {status.message && (
        <p className="text-green-400 mb-4">{status.message}</p>
      )}
      {status.error && <p className="text-red-400 mb-4">{status.error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            New Password (optional)
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className={`w-full py-3 px-6 text-white rounded-lg transition duration-300 ease-in-out ${
            status.loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {status.loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
