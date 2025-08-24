import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ForumPage from "./pages/DashboardPage";
import MainForumPage from "./pages/MainForumPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/main-forum" element={<MainForumPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
