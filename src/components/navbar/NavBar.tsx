import React from "react";
import NavigationButton from "../NavigationsButton";
import logo from "../../assets/logo.jpg";

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  showLogin?: boolean;
  showSignup?: boolean;
  showDashboard?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, showLogin = true, showSignup = true, showDashboard = true }) => {
  return (
    <nav className="home-nav">
      <div className="container">
        <div className="nav-brand">
          <img src={logo} alt="Conflux Paymaster SDK" className="brand-logo" />
          <a href="/">Conflux Paymaster SDK</a>
        </div>
        <div className="nav-actions">
          <NavigationButton
            path="/docs"
            variant="premium"
            style={{
              fontSize: '1rem',
              padding: '0.75rem 1.5rem',
              marginLeft: '0.5rem'
            }}
          >
            Docs
          </NavigationButton>
          {showLogin && (
            <NavigationButton
              path="/login"
              variant="secondary"
              style={{
                fontSize: '1rem',
                padding: '0.75rem 1.5rem',
                marginLeft: '0.5rem'
              }}
            >
              Login
            </NavigationButton>
          )}
          {showSignup && (
            <NavigationButton
              path="/signup"
              variant="secondary"
              style={{
                fontSize: '1rem',
                padding: '0.75rem 1.5rem',
                marginLeft: '0.5rem'
              }}
            >
              Sign Up
            </NavigationButton>
          )}
          {showDashboard && (
            <NavigationButton
              path="/dashboard"
              variant="primary"
              style={{
                fontSize: '1rem',
                padding: '0.75rem 1.5rem',
                marginLeft: '0.5rem'
              }}
            >
              Dashboard
            </NavigationButton>
          )}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            style={{ marginLeft: '0.5rem' }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;