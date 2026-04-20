import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Header, Message, Button, Input, Form, Select, Segment, Icon, Loader } from "semantic-ui-react";
import { useTheme } from "../../services/ThemeProvider";
import Navbar from "../../components/navbar/NavBar";
import Footer from "../../components/landing/Footer";
import WalletConnect from "../../components/wallet/WalletConnect";
import "./Signup.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

const PROJECT_TYPES = [
  { key: "defi", value: "DeFi", text: "DeFi" },
  { key: "nft", value: "NFT", text: "NFT Marketplace" },
  { key: "game", value: "Game", text: "Game" },
  { key: "social", value: "Social", text: "Social Network" },
  { key: "wallet", value: "Wallet", text: "Wallet" },
  { key: "exchange", value: "Exchange", text: "Crypto Exchange" },
  { key: "dao", value: "DAO", text: "DAO" },
  { key: "launchpad", value: "Launchpad", text: "Launchpad" },
  { key: "other", value: "Other", text: "Other" },
];

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [walletAddress, setWalletAddress] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("Other");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedWallet = localStorage.getItem("wallet_address");
    if (savedWallet) {
      setWalletAddress(savedWallet);
    }
  }, []);

  const handleWalletConnected = async (address: string) => {
    setWalletAddress(address);
    localStorage.setItem("wallet_address", address);
  };

  const handleSignup = async () => {
    if (!walletAddress) {
      setError("Please connect your wallet first");
      return;
    }
    if (!projectName.trim()) {
      setError("Project name is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: walletAddress,
          project_name: projectName,
          project_type: projectType,
          description: description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error?.includes("already registered")) {
          const loginRes = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              address: walletAddress,
            }),
          });
          const loginData = await loginRes.json();
          if (loginData.isRegistered && loginData.api_key) {
            localStorage.setItem("dapp_api_key", loginData.api_key);
            navigate("/dashboard");
            return;
          }
        }
        throw new Error(data.error || "Registration failed");
      }

      localStorage.setItem("dapp_api_key", data.api_key);
      localStorage.setItem("wallet_address", walletAddress);
      
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "Failed to register project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <Navbar theme={theme} toggleTheme={toggleTheme} showLogin={false} showSignup={false} showDashboard={false} />
      <div className="page-container">
        <div className="signup-card">
          <div className="signup-icon">
            <Icon name="rocket" size="massive" />
          </div>
          
          <Header as="h1" className="signup-title">
            Create Your Project
          </Header>
          
          <p className="signup-subtitle">
            Complete your registration to start sponsoring gasless transactions
          </p>

          {!walletAddress ? (
            <Segment className="wallet-connect-box">
              <p>Please connect your wallet to continue:</p>
              <WalletConnect onConnected={handleWalletConnected} />
            </Segment>
          ) : (
            <Segment className="wallet-info-box">
              <Icon name="check circle" />
              <span>Connected: <strong>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</strong></span>
            </Segment>
          )}

          <Form className="signup-form">
            <Form.Field>
              <label>Project Name *</label>
              <Input
                placeholder="My Awesome Project"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                icon="folder"
                iconPosition="left"
              />
            </Form.Field>

            <Form.Field>
              <label>Project Type *</label>
              <Select
                options={PROJECT_TYPES}
                value={projectType}
                onChange={(_, data) => setProjectType(data.value as string)}
                placeholder="Select project type"
                fluid
              />
            </Form.Field>

            <Form.Field>
              <label>Description (optional)</label>
              <Form.TextArea
                placeholder="Tell us about your project..."
                value={description}
                onChange={(_, data) => setDescription(data.value as string)}
                rows={3}
              />
            </Form.Field>

            {error && (
              <Message negative className="error-message">
                <p>{error}</p>
              </Message>
            )}

            <Button 
              color="blue" 
              size="large" 
              onClick={handleSignup}
              loading={loading}
              disabled={loading || !walletAddress || !projectName}
              className="signup-btn"
            >
              <Icon name="rocket" /> Create Project
            </Button>
          </Form>
        </div>
      </div>
      <Footer variant={theme} />
    </div>
  );
};

export default SignupPage;