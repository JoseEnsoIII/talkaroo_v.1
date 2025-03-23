import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Layout Components
import Navbar from "./Pages/Layout_Components/Navbar";
import Footer from "./Pages/Layout_Components/Footer";
import Chatbot from "./Pages/Layout_Components/Floating_Chatbot";

// Auth Pages
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/Register";
import AdminLogin from "./Pages/Auth/Admin_login";

// Admin Pages
import AdminDashboard from "./Pages/Dashboard/Admin_Dashboard";
import AdminUsers from "./Pages/Dashboard/Dashboard_Pages.jsx/Dashboard_Users";

// Client Pages
import ProfilePage from "./Pages/Dashboard/Client_Dashboard";
import Settings from "./Pages/Dashboard/Dashboard_Pages.jsx/Settings";
import NotificationPage from "./Pages/Dashboard/Dashboard_Pages.jsx/Notifications";
import Users from "./Pages/Dashboard/Dashboard_Pages.jsx/Users";

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
import Feedback from "./Components/compo/compo-pages/Feedback";

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
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/about-us" element={<><Navbar /><AboutUs /><Footer /></>} />
        <Route path="/contact-us" element={<><Navbar /><ContactUs /><Footer /></>} />
        <Route path="/privacy-policy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
        <Route path="/terms-of-service" element={<><Navbar /><TermsOfService /><Footer /></>} />
        <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
        <Route path="/signup" element={<><Navbar /><SignUp /><Footer /></>} />
        <Route path="/community" element={<><Navbar /><Community /><Footer /></>} />
        <Route path="/vocabulary" element={<><Navbar /><Vocabulary /><Footer /></>} />
        <Route path="/grammar" element={<><Navbar /><Grammar /><Footer /></>} />
        <Route path="/practice" element={<><Navbar /><Practice /><Footer /></>} />
        <Route path="/Talkaroo-AI" element={<><Navbar /><AI /><Footer /></>} />
        <Route path="/courses" element={<><Navbar /><Courses /><Footer /></>} />
        <Route path="/feedback" element={<><Navbar /><Feedback /><Footer /></>} />
        <Route path="/enroll/:courseName" element={<><Navbar /><EnrollmentForm /><Footer /></>} />
        <Route path="/payment" element={<><Navbar /><Payment /><Footer /></>} />

        {/* Dashboard Routes without Navbar and Footer */}
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/profile/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/profile/notification" element={<ProtectedRoute><NotificationPage notifications={notifications} markAsRead={markAsRead} /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        
        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
