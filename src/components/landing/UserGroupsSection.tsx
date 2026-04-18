import React from "react";

const UserGroupsSection: React.FC = () => {
  return (
    <div className="section-dark">
      <div className="container">
        <h2 className="section-title">Built for Every dApp</h2>
        <p className="section-subtitle">
          Conflux Paymaster SDK enables gasless transactions for any use case.
        </p>

        <div className="user-groups">

        <div className="user-group-card">
            <div className="user-group-icon">💱</div>
            <h3>DeFi & Fintech</h3>
            <p>
              Enable users to swap, stake, and trade without holding CFX.
              Perfect for exchanges, wallets, and payment apps.
            </p>
            <ul className="user-group-features">
              <li>Instant onboarding</li>
              <li>Zero gas friction</li>
              <li>Micropayments possible</li>
              <li>Cross-platform support</li>
            </ul>
          </div>
          <div className="user-group-card">
            <div className="user-group-icon">🎮</div>
            <h3>Gaming & NFTs</h3>
            <p>
              Onboard players instantly with free in-game actions.
              Mint NFTs, trade assets without wallet setup.
            </p>
            <ul className="user-group-features">
              <li>Free gameplay</li>
              <li>No wallet needed</li>
              <li>Instant rewards</li>
              <li>High-frequency transactions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGroupsSection;