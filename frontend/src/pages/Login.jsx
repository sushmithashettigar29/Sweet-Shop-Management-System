import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(username, password);
      login(res.data.user, res.data.token);

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative flex min-h-screen bg-[#FDF0D5] font-sans overflow-hidden">
      <div className="flex w-full flex-col md:flex-row items-center justify-center p-8 md:p-10">
        {/* Left section with hero text */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 text-center md:text-left">
          <div className="max-w-md">
            <h1 className="text-6xl md:text-7xl font-extrabold text-[#8B2321] mb-4">
              Sweet.
            </h1>
            <p className="text-gray-600 max-w-sm mx-auto md:mx-0">
              Your one-stop shop for all things sweet and delicious. Manage your
              inventory, track sales, and delight your customers with ease.
            </p>
          </div>
        </div>

        {/* Right section with login form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-white p-8">
            <h2 className="text-4xl font-extrabold text-[#8B2321] text-center mb-2">
              Login
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Please log in to your account.
            </p>

            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="sr-only" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B2321] focus:border-[#8B2321] transition-all"
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#8B2321] focus:border-[#8B2321] transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#8B2321] text-white py-3 font-semibold transition-colors cursor-pointer"
              >
                Login
              </button>
              <p className="text-center text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#8B2321] font-semibold cursor-pointer underline"
                >
                  SignUp
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
