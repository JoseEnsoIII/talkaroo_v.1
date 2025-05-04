import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./Pages/Header/Navbar";
import Footer from "./Pages/Layout_Components/Footer";
import AboutUs from './Components/Section/AboutUs';
import ContactUs from './Components/Section/ContactUs';

import Chatbot from "./Pages/Layout_Components/Floating_Chatbot";
import LazyLoading from "./Pages/Layout_Components/LazyLoading"; // Lottie animation loader

// Lazy-loaded pages
const Home = lazy(() => import("./Pages/Static/Home"));
const PrivacyPolicy = lazy(() => import("./Components/compo/compo-pages/Privacy-Policy"));
const TermsOfService = lazy(() => import("./Components/compo/compo-pages/TermsofService"));
const NotFound = lazy(() => import("./Pages/Static/NotFound"));

const Login = lazy(() => import("./Pages/Auth/Login"));
const SignUp = lazy(() => import("./Pages/Auth/Register"));
const AdminLogin = lazy(() => import("./Pages/Auth/Admin_login"));

const ClientDashboard = lazy(() => import("./Pages/Dashboard/Client Dashboard/Client_Dashboard"));
const ClientProfile = lazy(() => import("./Pages/Dashboard/Client Dashboard/Profile"));
const User_Notification = lazy(() => import("./Pages/Dashboard/Client Dashboard/Notifications"));
const User_Course = lazy(() => import("./Pages/Dashboard/Client Dashboard/My_Courses"));
const User_Certificate = lazy(() => import("./Pages/Dashboard/Client Dashboard/Certificates"));
const User_Settings = lazy(() => import("./Pages/Dashboard/Client Dashboard/Settings"));

const Community = lazy(() => import("./Pages/Dynamic Pages/Community"));
const Vocabulary = lazy(() => import("./Pages/Dynamic Pages/Vocabulary"));
const Grammar = lazy(() => import("./Pages/Dynamic Pages/Grammar"));
const Practice = lazy(() => import("./Pages/Dynamic Pages/Practice"));
const AI = lazy(() => import("./Pages/Dynamic Pages/AI"));
const Courses = lazy(() => import("./Pages/Dynamic Pages/Course"));
const EnrollmentForm = lazy(() => import("./Pages/Dynamic Pages/Enrollment-Page"));
const Payment = lazy(() => import("./Pages/Dynamic Pages/Payment"));

// Admin Pages
const AdminDashboard = lazy(() => import("./Pages/Dashboard/Admin Dashboard/Admin_Dashboard"));
const AdminUsers = lazy(() => import("./Pages/Dashboard/Admin Dashboard/Admin_Users"));
const AdminCourse = lazy(() => import("./Pages/Dashboard/Admin Dashboard/Admin_Course"));
const AdminActivities = lazy(() => import("./Pages/Dashboard/Admin Dashboard/Admin_Activities"));
const AdminNotifications = lazy(() => import("./Pages/Dashboard/Admin Dashboard/Admin_Notifications"));
const AdminSettings = lazy(() => import("./Pages/Dashboard/Admin Dashboard/Admin_Settings"));
const AdminFeedback = lazy(() => import("./Pages/Dashboard/Admin Dashboard/Admin_Feedback"));
const AdminBlogDashboard = lazy(() => import("./Pages/Dashboard/Admin Dashboard/Admin_Blog"));

import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Suspense fallback={<LazyLoading />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/privacy-policy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
          <Route path="/terms-of-service" element={<><Navbar /><TermsOfService /><Footer /></>} />
          <Route path="/about-us" element={<><Navbar /><AboutUs /><Footer /></>} /> 
          <Route path="/contact-us" element={<><Navbar /><ContactUs /><Footer /></>} />

          {/* Auth Pages */}
          <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
          <Route path="/signup" element={<><Navbar /><SignUp /><Footer /></>} />

          {/* Dynamic Pages */}
          <Route path="/community" element={<><Navbar /><Community /><Footer /></>} />
          <Route path="/vocabulary" element={<><Navbar /><Vocabulary /><Footer /></>} />
          <Route path="/grammar" element={<><Navbar /><Grammar /><Footer /></>} />
          <Route path="/practice" element={<><Navbar /><Practice /><Footer /></>} />
          <Route path="/Talkaroo-AI" element={<><Navbar /><AI /><Footer /></>} />
          <Route path="/courses" element={<><Navbar /><Courses /><Footer /></>} />
          <Route path="/enroll/:courseName" element={<><Navbar /><EnrollmentForm /><Footer /></>} />
          <Route path="/payment" element={<><Navbar /><Payment /><Footer /></>} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/dashboard/profile" element={<ClientProfile />} />
          <Route path="/dashboard/notification" element={<User_Notification />} />
          <Route path="/dashboard/my-courses" element={<User_Course />} />
          <Route path="/dashboard/certificate" element={<User_Certificate />} />
          <Route path="/dashboard/settings" element={<User_Settings />} />

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
      </Suspense>
      <Chatbot />
    </Router>
  );
}

export default App;
