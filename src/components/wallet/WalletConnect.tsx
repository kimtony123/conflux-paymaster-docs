import { useState, useCallback, useEffect } from "react";
import { Button, Message, Loader } from "semantic-ui-react";
import { ethers } from "ethers";

const LOGIN_MESSAGE = "Login to Conflux Paymaster";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

const CONFLUX_TESTNET_CHAIN_ID = "0x47";

interface WalletConnectProps {
  onConnected?: (address: string, apiKey: string, userExists: boolean) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnected }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveWallet = (address: string) => {
    localStorage.setItem("wallet_address", address);
  };

  const connectWallet = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not installed");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: CONFLUX_TESTNET_CHAIN_ID }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: CONFLUX_TESTNET_CHAIN_ID,
              chainName: 'Conflux eSpace Testnet',
              nativeCurrency: { name: 'CFX', symbol: 'CFX', decimals: 18 },
              rpcUrls: ['https://evmtestnet.confluxrpc.com'],
              blockExplorerUrls: ['https://evmtestnet.confluxscan.io'],
            }],
          });
        }
      }

      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const address = accounts[0];
      saveWallet(address);

      const checkResponse = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      const checkData = await checkResponse.json();

      if (!checkResponse.ok) {
        throw new Error(checkData.error || "Failed to check registration");
      }

      if (!checkData.isRegistered) {
        if (onConnected) {
          onConnected(address, "", false);
        }
        return;
      }

      localStorage.setItem("dapp_api_key", checkData.api_key);
      
      if (onConnected) {
        onConnected(address, checkData.api_key, true);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  }, [onConnected]);

  useEffect(() => {
    const savedWallet = localStorage.getItem("wallet_address");
    if (savedWallet && onConnected) {
      const savedApiKey = localStorage.getItem("dapp_api_key");
      if (savedApiKey) {
        onConnected(savedWallet, savedApiKey, true);
      }
    }
  }, [onConnected]);

  return (
    <div className="wallet-connect">
      {loading && (
        <div className="connect-loading">
          <Loader active inline="centered">Connecting to MetaMask...</Loader>
        </div>
      )}

      {error && (
        <Message negative className="connect-error">
          <Message.Header>Connection Failed</Message.Header>
          <p>{error}</p>
        </Message>
      )}

      {!loading && (
        <Button color="blue" size="large" onClick={connectWallet} disabled={!!error}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;