import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Message, Icon, Loader } from "semantic-ui-react";
import { useTheme } from "../../services/ThemeProvider";
import Navbar from "../../components/navbar/NavBar";
import WalletConnect from "../../components/wallet/WalletConnect";
import "./Login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const apiKey = localStorage.getItem("dapp_api_key");
    if (apiKey) {
      navigate("/dashboard");
    } else {
      setChecking(false);
    }
  }, [navigate]);

  const handleConnected = (address: string, apiKey: string, userExists: boolean) => {
    if (!userExists) {
      navigate("/signup", { state: { walletAddress: address } });
    } else if (apiKey) {
      localStorage.setItem("dapp_api_key", apiKey);
      navigate("/dashboard");
    }
  };

  if (checking) {
    return (
      <div className="login-page">
        <Navbar theme={theme} toggleTheme={toggleTheme} showDashboard={false} />
        <Loader active size="large">Loading...</Loader>
      </div>
    );
  }

  return (
    <div className="login-page">
      <Navbar theme={theme} toggleTheme={toggleTheme} showDashboard={false} />
      <div className="page-container">
        <div className="login-card">
          <div className="login-icon">
            <Icon name="wallet" size="massive" />
          </div>
          
          <Header as="h1" className="login-title">
            Welcome to Conflux Paymaster
          </Header>
          
          <Message info size="large" className="login-description">
            <Message.Header>Connect Your Wallet</Message.Header>
            <p>
              Connect your MetaMask wallet to access your dashboard. 
              New projects will complete their registration after connecting.
            </p>
          </Message>

          <div className="login-button-container">
            <WalletConnect onConnected={handleConnected} />
          </div>

          <Message info className="login-note">
            <p>
              <Icon name="info circle" />
              By connecting, you agree to sign a message to verify wallet ownership.
            </p>
          </Message>
        </div>
      </div>
    </div>
  );
};

export default Login;