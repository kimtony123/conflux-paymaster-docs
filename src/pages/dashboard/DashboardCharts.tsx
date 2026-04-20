import { useState, useEffect } from "react";
import { Segment, Icon, Select, Loader } from "semantic-ui-react";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "./DashboardCharts.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

interface DailyData {
  date: string;
  transactions: number;
  gas_cost_eth: string;
  deposit_cost_eth: string;
}

interface SpendingCategory {
  gas_fees: number;
  deposits: number;
}

interface Totals {
  transactions: number;
  gas_spent_eth: string;
  deposit_spent_eth: string;
  total_spent_eth: string;
}

interface ChartsData {
  daily: DailyData[];
  spending_by_category: SpendingCategory;
  totals: Totals;
  period_days: number;
}

interface DashboardChartsProps {
  apiKey: string;
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ apiKey }) => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartsData | null>(null);
  const [period, setPeriod] = useState(7);

  useEffect(() => {
    fetchChartData();
  }, [apiKey, period]);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/v1/dapps/me/charts?days=${period}`, {
        headers: { "X-API-Key": apiKey }
      });
      
      if (response.ok) {
        const data = await response.json();
        setChartData(data);
      }
    } catch (err) {
      console.error("Charts fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const periodOptions = [
    { key: "7", value: "7", text: "Last 7 days" },
    { key: "14", value: "14", text: "Last 14 days" },
    { key: "30", value: "30", text: "Last 30 days" },
  ];

  if (loading) {
    return (
      <div className="charts-loading">
        <Loader active>Loading charts...</Loader>
      </div>
    );
  }

  const dailyChartData = {
    labels: chartData?.daily.map(d => d.date) || [],
    datasets: [
      {
        label: "Transactions",
        data: chartData?.daily.map(d => d.transactions) || [],
        backgroundColor: "rgba(37, 99, 235, 0.8)",
        borderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 1,
        yAxisID: "y",
      },
      {
        label: "Gas Cost (CFX)",
        data: chartData?.daily.map(d => parseFloat(d.gas_cost_eth)) || [],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
        yAxisID: "y1",
      }
    ]
  };

  const dailyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: "Usage Over Time",
        font: { size: 16, weight: "bold" as const }
      },
      legend: {
        position: "top" as const,
      }
    },
    scales: {
      x: {
        grid: { display: false }
      },
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: { display: true, text: "Transactions" }
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: { display: true, text: "CFX Spent" },
        grid: { drawOnChartArea: false }
      }
    }
  };

  const pieChartData = {
    labels: ["Gas Fees", "Deposits"],
    datasets: [{
      data: [
        chartData?.spending_by_category.gas_fees || 0,
        chartData?.spending_by_category.deposits || 0
      ],
      backgroundColor: [
        "rgba(37, 99, 235, 0.8)",
        "rgba(16, 185, 129, 0.8)"
      ],
      borderColor: [
        "rgba(37, 99, 235, 1)",
        "rgba(16, 185, 129, 1)"
      ],
      borderWidth: 2,
    }]
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Spending Breakdown",
        font: { size: 16, weight: "bold" as const }
      },
      legend: {
        position: "bottom" as const,
      }
    }
  };

  const getLast7Days = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      return days[d.getDay()];
    });
  };

  const activityData = {
    labels: getLast7Days(),
    datasets: [{
      label: "Daily Activity",
      data: chartData?.daily.slice(-7).map(d => d.transactions) || Array(7).fill(0),
      fill: true,
      backgroundColor: "rgba(37, 99, 235, 0.2)",
      borderColor: "rgba(37, 99, 235, 1)",
      tension: 0.4,
    }]
  };

  const activityChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Daily Activity Trend",
        font: { size: 16, weight: "bold" as const }
      },
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0,0,0,0.05)" }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  const totalTransactions = chartData?.totals?.transactions || 0;
  const totalSpent = chartData?.totals?.total_spent_eth || "0";
  const avgPerDay = totalTransactions > 0 && chartData?.period_days 
    ? (totalTransactions / chartData.period_days).toFixed(1) 
    : "0";

  return (
    <div className="dashboard-charts">
      <div className="charts-stats">
        <div className="stat-box">
          <Icon name="exchange" />
          <div className="stat-content">
            <span className="stat-value">{totalTransactions}</span>
            <span className="stat-label">Total Transactions</span>
          </div>
        </div>
        <div className="stat-box">
          <Icon name="money" />
          <div className="stat-content">
            <span className="stat-value">{totalSpent} CFX</span>
            <span className="stat-label">Total Spent</span>
          </div>
        </div>
        <div className="stat-box">
          <Icon name="chart line" />
          <div className="stat-content">
            <span className="stat-value">{avgPerDay}</span>
            <span className="stat-label">Avg/Day</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <Segment className="chart-card">
          <div className="chart-container">
            <Bar data={dailyChartData} options={dailyChartOptions} />
          </div>
        </Segment>

        <Segment className="chart-card">
          <div className="chart-container pie-container">
            <Doughnut data={pieChartData} options={pieChartOptions} />
          </div>
        </Segment>

        <Segment className="chart-card">
          <div className="chart-container">
            <Line data={activityData} options={activityChartOptions} />
          </div>
        </Segment>
      </div>

      <div className="charts-footer">
        <label className="period-label">Period:</label>
        <Select
          options={periodOptions}
          value={period.toString()}
          onChange={(_, data) => setPeriod(parseInt(data.value as string))}
          className="period-select"
          inline
        />
      </div>
    </div>
  );
};

export default DashboardCharts;