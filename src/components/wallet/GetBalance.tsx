import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";

const CONFLUX_RPC = "https://evmtestnet.confluxrpc.com";

interface GetBalanceProps {
  onBalanceChange?: (balance: string) => void;
}

const GetBalance: React.FC<GetBalanceProps> = ({ onBalanceChange }) => {
  const [balance, setBalance] = useState<string>("0");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!window.ethereum) {
      setError("MetaMask not installed");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (!accounts || accounts.length === 0) {
        setError("No account connected");
        setLoading(false);
        return;
      }

      const balanceWei = await provider.getBalance(accounts[0]);
      const balanceEth = ethers.formatEther(balanceWei);
      
      setBalance(balanceEth);
      if (onBalanceChange) {
        onBalanceChange(balanceEth);
      }
    } catch (err: any) {
      console.error("Balance fetch error:", err);
      setError(err.message || "Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  }, [onBalanceChange]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, loading, error, refreshBalance: fetchBalance };
};

export default GetBalance;