import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import SweetDetail from "./pages/SweetDetail";
import AllSweets from "./pages/AllSweets";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Sweet detail */}
        <Route path="/sweets/:id" element={<SweetDetail />} />
        <Route path="/all-sweets" element={<AllSweets/>}/>
        <Route path="/contact" element={<Contact/>}/>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Footer outside Routes */}
      <Footer />
    </Router>
  );
}

export default App;
