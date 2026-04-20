import React from "react";

const FeaturesSection: React.FC = () => {
  return (
    <div className="section-dark">
      <div className="container">
        <h2 className="section-title">Features</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">⚡</div>
            <h3>Gasless Transactions</h3>
            <p>Users never need CFX. Your dApp sponsors all gas fees automatically.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📦</div>
            <h3>Pre-built SDK</h3>
            <p>Drop-in TypeScript SDK with full type safety. npm install and go.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔒</div>
            <h3>Secure Signing</h3>
            <p>Backend signing service keeps keys secure. Never exposed to clients.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔗</div>
            <h3>ERC-4337 Compatible</h3>
            <p>Full account abstraction standard. Works with any ERC-4337 bundler.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🧪</div>
            <h3>✅ LIVE TESTED</h3>
            <p>E2E test passed! Sender CFX unchanged after transaction.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌐</div>
            <h3>Conflux Native</h3>
            <p>Purpose-built for Conflux eSpace testnet and mainnet.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🏢</div>
            <h3>Multi-Tenant</h3>
            <p>Multiple DApps can register as verifiers with their own quotas.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔄</div>
            <h3>Relayer Service</h3>
            <p>Built-in relayer submits to EntryPoint, gets reimbursed by paymaster.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;