
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaChartLine,
  FaUsers,
  FaWallet,
  FaExchangeAlt,
  FaCog,
  FaSignOutAlt,
  FaFileAlt,
  FaBell,
} from 'react-icons/fa';
import '../styles/dashboard.css';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const performanceData = [
  { name: "Apr 19", value: 10.5 },
  { name: "Apr 26", value: 11.4 },
  { name: "May 03", value: 11.2 },
  { name: "May 10", value: 12.0 },
  { name: "May 17", value: 12.4 },
];

const holdingsData = [
  { name: "Equity", value: 78.5 },
  { name: "Mutual Funds", value: 12.3 },
  { name: "Cash", value: 9.2 },
];

const COLORS = ["#2563eb", "#93c5fd", "#10b981"];

const topGainers = [
  { name: "RELIANCE", price: "₹2,456.80", gain: "+4.25%" },
  { name: "TCS", price: "₹3,542.60", gain: "+3.85%" },
  { name: "HDFCBANK", price: "₹1,655.90", gain: "+3.25%" },
  { name: "INFY", price: "₹1,892.30", gain: "+2.95%" },
  { name: "ICICIBANK", price: "₹1,234.50", gain: "+2.45%" },
];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    { title: 'Total Accounts', value: '100' },
    { title: 'Portfolio Value', value: '₹12.45Cr' },
    { title: 'Total Investment', value: '₹9.85Cr' },
    { title: 'Total P&L', value: '₹2.60Cr' },
    { title: "Today's P&L", value: '₹28.45L' },
  ];

  return (
    <div className="pp-dashboard">

      <aside className="pp-sidebar">
        <div className="pp-logo">
          <h2>PortfolioPro</h2>
          <p>Portfolio Management</p>
        </div>

        <nav className="pp-nav">
          <div className="pp-nav-active">
            <FaChartLine />
            <span>Dashboard</span>
          </div>

          <h4>PORTFOLIO</h4>

          <div className="pp-nav-item"><FaUsers /> Accounts</div>
          <div className="pp-nav-item"><FaWallet /> Holdings</div>
          <div className="pp-nav-item"><FaExchangeAlt /> Positions</div>
          <div className="pp-nav-item"><FaExchangeAlt /> Orders</div>
          <div className="pp-nav-item"><FaExchangeAlt /> Trades</div>
          <div className="pp-nav-item"><FaFileAlt /> Transactions</div>

          <h4>ANALYTICS</h4>

          <div className="pp-nav-item"><FaChartLine /> Performance</div>
          <div className="pp-nav-item"><FaFileAlt /> Reports</div>
          <div className="pp-nav-item"><FaBell /> Alerts</div>

          <h4>ADMIN</h4>

          <div className="pp-nav-item"><FaUsers /> Users</div>
          <div className="pp-nav-item"><FaUsers /> Roles & Permissions</div>
          <div className="pp-nav-item"><FaCog /> Settings</div>
        </nav>

        <div className="pp-user-card">
          <div className="pp-user-name">
            {user?.name || 'Admin User'}
          </div>

          <div className="pp-user-email">
            {user?.email || 'admin@example.com'}
          </div>
        </div>
      </aside>

      <main className="pp-main">

        <div className="pp-header">
          <div>
            <h1>Dashboard</h1>
            <p>Overview of your portfolio and accounts</p>
          </div>

          <button
            className="pp-logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        <div className="pp-stats-grid">
          {stats.map((item) => (
            <div className="pp-stat-card" key={item.title}>
              <p>{item.title}</p>
              <h2>{item.value}</h2>
            </div>
          ))}
        </div>

        <div className="pp-content-grid">

  {/* Portfolio Performance */}
  <div className="pp-large-card">
    <h3>Portfolio Performance</h3>

    <div style={{ height: "320px", marginTop: "20px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#16a34a"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Holdings Summary */}
  <div className="pp-small-card">
    <h3>Holdings Summary</h3>

    <div style={{ height: "320px", marginTop: "20px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={holdingsData}
            dataKey="value"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
          >
            {holdingsData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Top Gainers */}
  <div className="pp-small-card">
    <h3>Top Gainers</h3>

    {topGainers.map((stock) => (
      <div
        key={stock.name}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "14px 0",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <strong>{stock.name}</strong>

        <div>
          <span style={{ marginRight: "16px" }}>
            {stock.price}
          </span>

          <span style={{ color: "#16a34a" }}>
            {stock.gain}
          </span>
        </div>
      </div>
    ))}
  </div>


</div>

{/* Quick Actions */}
<div className="pp-quick-actions">
  <button>Add Account</button>
  <button>Place Order</button>
  <button>Bulk Import</button>
  <button>Generate Report</button>
  <button>Set Alert</button>
</div>

{/* Bottom Grid */}
<div className="pp-bottom-grid">

  <div className="pp-table-card">
    <h3>Recent Accounts</h3>

    <table>
      <thead>
  <tr>
    <th>Account Holder</th>
    <th>DP ID</th>
    <th>Client ID</th>
    <th>Status</th>
    <th>Value</th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>Rahul Sharma</td>
    <td>12081600</td>
    <td>25000987</td>
    <td><span className="active">Active</span></td>
    <td>₹12,45,600</td>
  </tr>

  <tr>
    <td>Priya Patel</td>
    <td>12081600</td>
    <td>25000988</td>
    <td><span className="active">Active</span></td>
    <td>₹8,75,300</td>
  </tr>

  <tr>
    <td>Amit Kumar</td>
    <td>12081600</td>
    <td>25000989</td>
    <td><span className="active">Active</span></td>
    <td>₹15,25,800</td>
  </tr>

  <tr>
    <td>Sneha Reddy</td>
    <td>12081600</td>
    <td>25000990</td>
    <td><span className="inactive">Inactive</span></td>
    <td>₹0</td>
  </tr>

  <tr>
    <td>Vikash Singh</td>
    <td>12081600</td>
    <td>25000991</td>
    <td><span className="active">Active</span></td>
    <td>₹6,45,200</td>
  </tr>
</tbody>
    </table>
  </div>

  <div className="pp-table-card">
  <div className="card-header">
    <h3>Recent Orders</h3>
    <span>View all</span>
  </div>

  <table>
    <thead>
      <tr>
        <th>Symbol</th>
        <th>Type</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>RELIANCE</td>
        <td><span className="buy">BUY</span></td>
        <td>100</td>
        <td>₹2,450.00</td>
        <td><span className="completed">Completed</span></td>
      </tr>

      <tr>
        <td>TCS</td>
        <td><span className="sell">SELL</span></td>
        <td>50</td>
        <td>₹3,540.00</td>
        <td><span className="completed">Completed</span></td>
      </tr>

      <tr>
        <td>HDFCBANK</td>
        <td><span className="buy">BUY</span></td>
        <td>200</td>
        <td>₹1,650.00</td>
        <td><span className="pending">Pending</span></td>
      </tr>

      <tr>
        <td>INFY</td>
        <td><span className="buy">BUY</span></td>
        <td>150</td>
        <td>₹1,890.00</td>
        <td><span className="completed">Completed</span></td>
      </tr>

      <tr>
        <td>ICICIBANK</td>
        <td><span className="sell">SELL</span></td>
        <td>100</td>
        <td>₹1,230.00</td>
        <td><span className="pending">Pending</span></td>
      </tr>
    </tbody>
  </table>
</div>

  <div className="pp-table-card">
  <div className="card-header">
    <h3>Alerts</h3>
    <span>View all</span>
  </div>

  <div className="alert-row">
    <div className="alert-left">
      <span className="green-dot"></span>
      <div>
        <strong>Price Alert</strong>
        <p>RELIANCE has crossed above ₹2,450</p>
      </div>
    </div>
    <span>2 min ago</span>
  </div>

  <div className="alert-row">
    <div className="alert-left">
      <span className="orange-dot"></span>
      <div>
        <strong>Volume Alert</strong>
        <p>TCS trading volume is above average</p>
      </div>
    </div>
    <span>15 min ago</span>
  </div>

  <div className="alert-row">
    <div className="alert-left">
      <span className="blue-dot"></span>
      <div>
        <strong>Order Alert</strong>
        <p>Buy order for HDFCBANK is pending</p>
      </div>
    </div>
    <span>30 min ago</span>
  </div>

  <div className="alert-row">
    <div className="alert-left">
      <span className="red-dot"></span>
      <div>
        <strong>Price Alert</strong>
        <p>INFY has crossed below ₹1,900</p>
      </div>
    </div>
    <span>1 hour ago</span>
  </div>
</div>

</div> {/* closes pp-bottom-grid */}


<div className="card-header watch-header">
  <h3>Watchlist</h3>
  <span>View all</span>
</div>

<div className="pp-watchlist">

  <div className="pp-watch-card">
    <h4>NIFTY 50</h4>
    <p>24,750.70</p>
    <span>+1.25%</span>
  </div>

  <div className="pp-watch-card">
    <h4>SENSEX</h4>
    <p>81,330.56</p>
    <span>+1.18%</span>
  </div>

  <div className="pp-watch-card">
    <h4>BANK NIFTY</h4>
    <p>55,620.85</p>
    <span>+1.45%</span>
  </div>

  <div className="pp-watch-card">
    <h4>RELIANCE</h4>
    <p>2,456.80</p>
    <span>+4.25%</span>
  </div>

  <div className="pp-watch-card">
    <h4>TCS</h4>
    <p>3,542.60</p>
    <span>+3.85%</span>
  </div>

  <div className="pp-watch-card">
    <h4>HDFCBANK</h4>
    <p>1,655.90</p>
    <span>+3.25%</span>
  </div>

</div>

</main>
</div>

);
}