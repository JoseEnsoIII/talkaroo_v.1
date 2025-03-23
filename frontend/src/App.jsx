import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Layout Components
import Navbar from "./Pages/Layout_Components/Navbar";
import Footer from "./Pages/Layout_Components/Footer";
import Chatbot from "./Pages/Layout_Components/Floating_Chatbot";
import Feedback from "./Components/compo/compo-pages/Feedback";


// Auth Pages
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/Register";
import AdminLogin from "./Pages/Auth/Admin_login";
import Users from "./Pages/Dashboard/Dashboard_Pages.jsx/Users";

// Admin Pages
import AdminDashboard from "./Pages/Dashboard/Admin_Dashboard";
import AdminUsers from "./Pages/Dashboard/Dashboard_Pages.jsx/Dashboard_Users";

// Client Pages
import ProfilePage from "./Pages/Dashboard/Client_Dashboard";
import Settings from "./Pages/Dashboard/Dashboard_Pages.jsx/Settings";
import NotificationPage from "./Pages/Dashboard/Dashboard_Pages.jsx/Notifications";

// Static Pages
import Home from "./Pages/Static/Home";
import AboutUs from "./Components/compo/compo-pages/AboutUs";
import ContactUs from "./Components/compo/compo-pages/ContactUs";
import PrivacyPolicy from "./Components/compo/compo-pages/Privacy-Policy";
import TermsOfService from "./Components/compo/compo-pages/TermsofService";
import NotFound from "./Pages/Static/NotFound";

// Dynamic Pages
import Community from "./Pages/Dynamic_Pages/Community";
import Vocabulary from "./Pages/Dynamic_Pages/Vocabulary";
import Grammar from "./Pages/Dynamic_Pages/Grammar";
import Practice from "./Pages/Dynamic_Pages/Practice";
import Courses from "./Pages/Dynamic_Pages/Courses";
import AI from "./Pages/Dynamic_Pages/AI";
import EnrollmentForm from "./Pages/Dynamic_Pages/Enrollment-Page";
import Payment from "./Pages/Dynamic_Pages/Payment";
// Protected Route
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New course available!", read: false },
    { id: 2, message: "Your enrollment has been approved!", read: false },
  ]);

  // Function to mark notifications as read
  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/users" element={<Users />} />

        <Route path="/community" element={<Community />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/grammar" element={<Grammar />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/Talkaroo-AI" element={<AI />} />
        <Route path="/courses" element={<Courses />} />

        <Route path="/feedback" element={<Feedback />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/settings" element={<Settings />} />
        <Route
          path="/profile/notification"
          element={<NotificationPage notifications={notifications} markAsRead={markAsRead} />}
        />
       <Route path="/enroll/:courseName" element={<EnrollmentForm />} />
       <Route path="/payment" element={<Payment />} />
        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Chatbot />
      <Footer />
    </Router>
  );
}

export default App;
