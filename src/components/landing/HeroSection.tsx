import React from "react";
import NavigationButton from "../NavigationsButton";
import logo from "../../assets/logo.jpg";
import "./HeroSection.css";

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section" id="home">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video"
      >
        <source src="/permaclaw.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay to improve text contrast */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="container">
        <img src={logo} alt="Conflux Paymaster SDK" className="hero-logo" />
        <div className="hero-badge">⚡ GASLESS TRANSACTIONS FOR CONFLUX</div>
        <h1 className="hero-title">
          Enable gasless transactions on{" "}
          <span className="hero-highlight">Conflux eSpace</span>
        </h1>
        <p className="hero-description">
          Conflux Paymaster SDK is an open-source TypeScript library that enables
          any dApp to sponsor user gas fees. Built on ERC-4337 Account Abstraction.
          Users never need CFX - your dApp pays the gas.
        </p>

        <div className="hero-cta">
          <NavigationButton
            path="/docs"
            variant="premium"
            style={{
              fontSize: "1.2rem",
              padding: "1rem 2.5rem",
            }}
          >
            Get Started
          </NavigationButton>
          <p className="hero-note">
            Open Source • TypeScript • ERC-4337 Compatible
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="trust-metrics">
          <div className="metric">
            <div className="metric-value">3</div>
            <div className="metric-label">Minutes to Integrate</div>
          </div>
          <div className="metric-divider"></div>
          <div className="metric">
            <div className="metric-value">0</div>
            <div className="metric-label">CFX Users Need</div>
          </div>
          <div className="metric-divider"></div>
          <div className="metric">
            <div className="metric-value">100%</div>
            <div className="metric-label">User Onboarding</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;