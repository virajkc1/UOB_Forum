import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MainForumPage from "./pages/MainForumPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import VerifyPage from "./pages/VerifyPage";
import DashboardPage from "./pages/DashboardPage";
import { AboutPage } from "./AboutPage";
import { TeamPage } from "./TeamPage";
import { ContactPage } from "./ContactPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forum" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/main-forum" element={<MainForumPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
