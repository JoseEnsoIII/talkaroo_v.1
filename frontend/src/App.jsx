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
import AdminDashboard from "./Pages/Dashboard/Admin Dashboard/Admin_Dashboard";
import AdminUsers from "./Pages/Dashboard/Admin Dashboard/Admin_Users";
import AdminCourse from "./Pages/Dashboard/Admin Dashboard/Admin_Course";
import AdminActivities from "./Pages/Dashboard/Admin Dashboard/Admin_Activities";
import AdminNotifications from "./Pages/Dashboard/Admin Dashboard/Admin_Notifications";
import AdminSettings from "./Pages/Dashboard/Admin Dashboard/Admin_Settings";
import AdminFeedback from "./Pages/Dashboard/Admin Dashboard/Admin_Feedback";
// Client Pages | Dashboard
import ClientDashboard from "./Pages/Dashboard/Client Dashboard/Client_Dashboard";
import ClientProfile from "./Pages/Dashboard/Client Dashboard/Profile"
import User_Notification from "./Pages/Dashboard/Client Dashboard/Notifications";
import User_Course from "./Pages/Dashboard/Client Dashboard/My_Courses"
import User_Certificate from "./Pages/Dashboard/Client Dashboard/Certificates"
import User_Settings from "./Pages/Dashboard/Client Dashboard/Settings";
import Users from "./Pages/Dashboard/Dashboard_Pages/Users";

// Static Pages
import Home from "./Pages/Static/Home";
import AboutUs from "./Components/compo/compo-pages/AboutUs";
import ContactUs from "./Components/compo/compo-pages/ContactUs";
import PrivacyPolicy from "./Components/compo/compo-pages/Privacy-Policy";
import TermsOfService from "./Components/compo/compo-pages/TermsofService";
import NotFound from "./Pages/Static/NotFound";

// Dynamic Pages
import Community from "./Pages/Dynamic Pages/Community";
import Vocabulary from "./Pages/Dynamic Pages/Vocabulary";
import Grammar from "./Pages/Dynamic Pages/Grammar";
import Practice from "./Pages/Dynamic Pages/Practice";
import Courses from "./Pages/Dynamic Pages/Courses";
import AI from "./Pages/Dynamic Pages/AI";
import EnrollmentForm from "./Pages/Dynamic Pages/Enrollment-Page";
import Payment from "./Pages/Dynamic Pages/Payment";
import Feedback from "./Components/compo/compo-pages/Feedback";

// Protected Route
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminBlogDashboard from "./Pages/Dashboard/Admin Dashboard/Admin_Blog";

function App() {
  // Notifications state
  

  return (
    <Router>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/about-us" element={<><Navbar /><AboutUs /><Footer /></>} />
        <Route path="/contact-us" element={<><Navbar /><ContactUs /><Footer /></>} />
        <Route path="/privacy-policy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
        <Route path="/terms-of-service" element={<><Navbar /><TermsOfService /><Footer /></>} />
        {/* auth */}
        <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
        <Route path="/signup" element={<><Navbar /><SignUp /><Footer /></>} />
        {/* Dynamic pages */}
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
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/dashboard/profile" element={<ClientProfile />} />
        <Route path="/dashboard/notification" element={<User_Notification />} />
        <Route path="/dashboard/my-courses" element={<User_Course />} />
        <Route path="/dashboard/certificate" element={<User_Certificate />} />
        <Route path="/dashboard/settings" element={<User_Settings />} />


        <Route path="/users" element={<Users />} />
        
        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
<Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
<Route path="/admin/courses" element={<ProtectedRoute><AdminCourse /></ProtectedRoute>} />
<Route path="/admin/course-activities" element={<ProtectedRoute><AdminActivities /></ProtectedRoute>} />
<Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
<Route path="/admin/notification" element={<ProtectedRoute><AdminNotifications /></ProtectedRoute>} />
<Route path="/admin/feedback" element={<ProtectedRoute><AdminFeedback /></ProtectedRoute>} />
<Route path="/admin/blog" element={<ProtectedRoute><AdminBlogDashboard /></ProtectedRoute>} />
<Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
