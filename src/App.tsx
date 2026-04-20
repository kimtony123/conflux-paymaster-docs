import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/home/Home.tsx";
import Docs from "./pages/docs/docs.tsx";
import Login from "./pages/login/Login.tsx";
import Signup from "./pages/signup/Signup.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import AddFunds from "./pages/dashboard/AddFunds.tsx";
import { ThemeProvider } from './services/ThemeProvider';

const SignupWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const savedWallet = localStorage.getItem("wallet_address");
    const apiKey = localStorage.getItem("dapp_api_key");
    
    if (savedWallet && apiKey) {
      navigate("/dashboard", { replace: true });
    } else if (!savedWallet && !(location.state as any)?.walletAddress) {
      navigate("/login", { replace: true });
    }
  }, [navigate, location]);

  const walletAddress = (location.state as any)?.walletAddress || localStorage.getItem("wallet_address") || "";
  return <Signup walletAddress={walletAddress} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupWrapper />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-funds" element={<AddFunds />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;