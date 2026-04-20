import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, Header, Segment, Button, Message, Input, 
  Statistic, Icon, Modal, Form, Loader 
} from "semantic-ui-react";
import { ethers } from "ethers";
import { useTheme } from "../../services/ThemeProvider";
import Navbar from "../../components/navbar/NavBar";
import Footer from "../../components/landing/Footer";
import "./Dashboard.css";
import DashboardCharts from "./DashboardCharts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

interface DappInfo {
  id: string;
  owner_address: string;
  name: string;
  project_name: string;
  project_type: string;
  description: string;
  api_key: string;
  balance_wei: string;
  balance_eth: string;
}

interface UsageStats {
  total_transactions: number;
  total_gas_used: string;
  total_cost_wei: string;
  total_cost_eth: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [dappInfo, setDappInfo] = useState<DappInfo | null>(null);
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [depositLoading, setDepositLoading] = useState(false);
  const [depositTxHash, setDepositTxHash] = useState("");
  const [depositStatus, setDepositStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [walletBalance, setWalletBalance] = useState<string>("0");

  const getApiKey = () => localStorage.getItem("dapp_api_key") || "";
  const getAddress = () => localStorage.getItem("wallet_address") || "";

  const fetchData = useCallback(async () => {
    const apiKey = getApiKey();
    const walletAddress = getAddress();
    if (!apiKey) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      
      const meResponse = await fetch(`${BACKEND_URL}/api/v1/dapps/me`, {
        headers: { "X-API-Key": apiKey }
      });
      
      if (meResponse.ok) {
        const data = await meResponse.json();
        setDappInfo(data);
      }

      const usageResponse = await fetch(`${BACKEND_URL}/api/v1/dapps/me/usage`, {
        headers: { "X-API-Key": apiKey }
      });

      if (usageResponse.ok) {
        const data = await usageResponse.json();
        setUsage(data);
      }

      if (window.ethereum && walletAddress) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const bal = await provider.getBalance(walletAddress);
        setWalletBalance(ethers.formatEther(bal));
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    localStorage.removeItem("dapp_api_key");
    localStorage.removeItem("dapp_address");
    navigate("/login");
  };

  const copyApiKey = () => {
    if (dappInfo?.api_key) {
      navigator.clipboard.writeText(dappInfo.api_key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDeposit = async () => {
    if (!depositTxHash) return;
    
    setDepositLoading(true);
    setDepositStatus(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/deposits/verify`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-API-Key": getApiKey()
        },
        body: JSON.stringify({ tx_hash: depositTxHash })
      });

      const data = await response.json();
      
      if (response.ok && data.status === "confirmed") {
        setDepositStatus(`Deposit confirmed! Amount: ${data.amount_eth} CFX`);
        fetchData();
      } else {
        setDepositStatus(data.status || "Verification failed");
      }
    } catch (err: any) {
      setDepositStatus(err.message || "Verification failed");
    } finally {
      setDepositLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
<Navbar theme={theme} toggleTheme={toggleTheme} showLogin={false} showSignup={false} />
        <div className="dashboard-loading">
          <Loader active>Loading your dashboard...</Loader>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Navbar theme={theme} toggleTheme={toggleTheme} showLogin={false} showSignup={false} />
      <div className="page-content">
        <div className="dashboard-header">
          <div className="header-content">
            <h1>{dappInfo?.project_name || "My dApp"}</h1>
            <div className="dapp-details">
              <span className="dapp-type">
                <Icon name="tag" />
                {dappInfo?.project_type || "Other"}
              </span>
              <span className="dapp-id">
                <Icon name="hash" />
                ID: {dappInfo?.id?.slice(0, 8)}...
              </span>
            </div>
            <p className="wallet-info">
              <Icon name="wallet" />
              Connected: <span className="address">{dappInfo?.owner_address}</span>
            </p>
          </div>
          <Button color="red" basic onClick={handleLogout} className="logout-btn">
            <Icon name="log out" /> Logout
          </Button>
        </div>

        {error && (
          <Message negative className="error-message">
            <p>{error}</p>
          </Message>
        )}

        <div className="dashboard-cards">
          <div className="dashboard-card api-key-card">
            <div className="card-header">
              <Icon name="key" />
              <h3>API Key</h3>
            </div>
            <p className="card-description">
              Use this key in your SDK configuration to track usage to your dApp.
            </p>
            <div className="api-key-input">
              <input 
                type="text" 
                value={dappInfo?.api_key || ""} 
                readOnly 
                className="key-input"
              />
              <Button 
                color="blue" 
                onClick={copyApiKey}
                className="copy-btn"
              >
                <Icon name={copied ? "check" : "copy"} />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="dashboard-card balance-card">
            <div className="card-header">
              <Icon name="money" />
              <h3>Balance</h3>
            </div>
            
            <div className="balance-section">
              <div className="balance-row">
                <span className="balance-label">Your Wallet</span>
                <div className="balance-amount">
                  <span className="cfx-value">{parseFloat(walletBalance || "0").toFixed(4)}</span>
                  <span className="cfx-label">CFX</span>
                </div>
              </div>
              
              <div className="balance-divider"></div>
              
              <div className="balance-row">
                <span className="balance-label">Paymaster Balance</span>
                <div className="balance-amount">
                  <span className="cfx-value paymaster">{parseFloat(dappInfo?.balance_eth || "0").toFixed(4)}</span>
                  <span className="cfx-label">CFX</span>
                </div>
              </div>
            </div>
            
            <Button color="green" onClick={() => navigate("/add-funds")} className="add-funds-btn">
              <Icon name="plus" /> Add Funds
            </Button>
          </div>

          <div className="dashboard-card usage-card">
            <div className="card-header">
              <Icon name="chart bar" />
              <h3>Usage This Month</h3>
            </div>
            <div className="usage-stats">
              <div className="stat-item">
                <span className="stat-value">{usage?.total_transactions || 0}</span>
                <span className="stat-label">Transactions</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-value">{usage?.total_cost_eth || "0"}</span>
                <span className="stat-label">CFX Spent</span>
              </div>
            </div>
          </div>
        </div>

        {dappInfo?.api_key && (
          <DashboardCharts apiKey={dappInfo.api_key} />
        )}
      </div>

      <Modal open={depositModalOpen} onClose={() => setDepositModalOpen(false)} className="deposit-modal">
        <Modal.Header>
          <Icon name="money" /> Add Funds
        </Modal.Header>
        <Modal.Content>
          <Message info className="deposit-instructions">
            <Message.Header>How to deposit</Message.Header>
            <ol>
              <li>Send CFX to the paymaster address</li>
              <li>Copy the transaction hash from MetaMask</li>
              <li>Paste it below and click Verify</li>
            </ol>
          </Message>
          
          <div className="paymaster-address">
            <label>Paymaster Address:</label>
            <div className="address-box">
              0x0cDE16Cf1fD5Bf2536069Aec8a2eF0832A27577B
            </div>
          </div>
          
          <Form>
            <Form.Field>
              <label>Transaction Hash</label>
              <Input 
                placeholder="0x..."
                value={depositTxHash}
                onChange={(e) => setDepositTxHash(e.target.value)}
                className="tx-input"
              />
            </Form.Field>
          </Form>

          {depositStatus && (
            <Message 
              success={depositStatus.includes("confirmed")}
              error={!depositStatus.includes("confirmed")}
              className="deposit-status"
            >
              {depositStatus}
            </Message>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setDepositModalOpen(false)}>Cancel</Button>
          <Button 
            color="green" 
            onClick={handleDeposit}
            loading={depositLoading}
            disabled={!depositTxHash}
          >
            Verify Deposit
          </Button>
        </Modal.Actions>
      </Modal>
      <div className="page-footer">
        <Footer variant={theme} />
      </div>
    </div>
  );
};

export default Dashboard;