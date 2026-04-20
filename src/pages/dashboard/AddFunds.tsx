import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Header, Button, Input, Message, Icon, Segment, Loader } from "semantic-ui-react";
import { ethers } from "ethers";
import { useTheme } from "../../services/ThemeProvider";
import Navbar from "../../components/navbar/NavBar";
import Footer from "../../components/landing/Footer";
import "./AddFunds.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
const PAYMASTER_ADDRESS = "0x0cDE16Cf1fD5Bf2536069Aec8a2eF0832A27577B";
const CONFLUX_RPC = "https://evmtestnet.confluxrpc.com";

const AddFunds: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [walletBalance, setWalletBalance] = useState<string>("0");
  const [creditsAvailable, setCreditsAvailable] = useState<string>("0");
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [txHash, setTxHash] = useState<string>("");
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getApiKey = () => localStorage.getItem("dapp_api_key") || "";

  const fetchData = useCallback(async (isRefresh = false) => {
    const apiKey = getApiKey();
    if (!apiKey) {
      navigate("/login");
      return;
    }

    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const meResponse = await fetch(`${BACKEND_URL}/api/v1/dapps/me`, {
        headers: { "X-API-Key": apiKey }
      });

      if (meResponse.ok) {
        const data = await meResponse.json();
        setCreditsAvailable(data.balance_eth || "0");
      }

      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          const bal = await provider.getBalance(accounts[0]);
          setWalletBalance(ethers.formatEther(bal));
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    const amount = ethers.parseEther(depositAmount);
    if (amount <= 0n) {
      setError("Amount must be greater than 0");
      return;
    }

    try {
      setSending(true);
      setError(null);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: PAYMASTER_ADDRESS,
        value: amount,
      });

      setTxHash(tx.hash);
      setStatus("Transaction sent! Click 'Check Status' after confirming in MetaMask.");
    } catch (err: any) {
      console.error("Deposit error:", err);
      setError(err.message || "Failed to send transaction");
    } finally {
      setSending(false);
    }
  };

  const handleCheckStatus = async () => {
    if (!txHash) {
      setError("No transaction hash. Please deposit first.");
      return;
    }

    setChecking(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/deposits/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": getApiKey(),
        },
        body: JSON.stringify({ tx_hash: txHash }),
      });

      const data = await response.json();

      if (response.ok && data.status === "confirmed") {
        setStatus(`Deposit confirmed! ${data.amount_eth} CFX added to your credits.`);
        fetchData();
      } else {
        setStatus(data.status || "Verification pending. Try again in a few seconds.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to verify deposit");
    } finally {
      setChecking(false);
    }
  };

  if (loading) {
    return (
      <div className="add-funds-page">
<Navbar theme={theme} toggleTheme={toggleTheme} showLogin={false} showSignup={false} />
        <div className="add-funds-loading">
          <Loader active size="large">Loading...</Loader>
        </div>
      </div>
    );
  }

  return (
    <div className="add-funds-page">
      <Navbar theme={theme} toggleTheme={toggleTheme} showLogin={false} showSignup={false} />
      <div className="page-content">
        <div className="add-funds-header">
          <Button basic onClick={() => navigate("/dashboard")} className="back-btn">
            <Icon name="arrow left" /> Back to Dashboard
          </Button>
          <h1>Add Funds</h1>
        </div>

        <div className="balance-cards">
          <div className="balance-card wallet-balance">
            <div className="card-icon">
              <Icon name="wallet" />
            </div>
            <div className="card-content">
              <span className="card-label">Your Wallet</span>
              <span className="card-value">{parseFloat(walletBalance).toFixed(2)} CFX</span>
            </div>
            <Button 
                basic 
                size="small" 
                onClick={() => fetchData(true)} 
                loading={refreshing}
                disabled={refreshing}
                className="refresh-btn"
              >
                <Icon name="refresh" />
              </Button>
          </div>

          <div className="balance-card credits-balance">
            <div className="card-icon">
              <Icon name="credit card" />
            </div>
            <div className="card-content">
              <span className="card-label">Credits Available</span>
              <span className="card-value">{parseFloat(creditsAvailable).toFixed(2)} CFX</span>
            </div>
          </div>
        </div>

        <Segment className="deposit-form">
          <div className="paymaster-address">
            <label>Send CFX to this address:</label>
            <div className="address-box">
              <span>{PAYMASTER_ADDRESS}</span>
              <Button
                size="small"
                onClick={() => navigator.clipboard.writeText(PAYMASTER_ADDRESS)}
                className="copy-btn"
              >
                <Icon name="copy" /> Copy
              </Button>
            </div>
          </div>

          <div className="amount-input">
            <label>Amount to deposit:</label>
            <Input
              type="number"
              placeholder="0.00"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              icon="cfx"
              iconPosition="left"
              step="0.01"
              min="0"
            />
            <span className="input-hint">You will receive 98% (2% fee)</span>
          </div>

          {error && (
            <Message negative className="error-message">
              <p>{error}</p>
            </Message>
          )}

          {status && (
            <Message success className="status-message">
              <Icon name="check circle" />
              <p>{status}</p>
            </Message>
          )}

          <div className="action-buttons">
            {!txHash ? (
              <Button
                color="blue"
                size="large"
                onClick={handleDeposit}
                loading={sending}
                disabled={sending || !depositAmount || parseFloat(depositAmount) <= 0}
                className="deposit-btn"
              >
                <Icon name="send" /> Add Funds
              </Button>
            ) : (
              <div className="post-deposit-actions">
                <Button
                  color="green"
                  size="large"
                  onClick={handleCheckStatus}
                  loading={checking}
                  disabled={checking}
                  className="check-btn"
                >
                  <Icon name="search" /> Check Status
                </Button>
                <Button
                  basic
                  size="large"
                  onClick={() => {
                    setTxHash("");
                    setStatus(null);
                    setDepositAmount("");
                  }}
                  className="new-btn"
                >
                  New Deposit
                </Button>
              </div>
            )}
          </div>

          {txHash && (
            <div className="tx-hash">
              <label>Transaction Hash:</label>
              <div className="hash-box">
                <a
                  href={`https://evmtestnet.confluxscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {txHash}
                </a>
              </div>
            </div>
          )}
        </Segment>
      </div>
      <div className="page-footer">
        <Footer variant={theme} />
      </div>
    </div>
  );
};

export default AddFunds;