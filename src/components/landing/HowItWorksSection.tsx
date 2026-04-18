import React from "react";

const HowItWorksSection: React.FC = () => {
  return (
    <div className="section-light">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Gasless transactions in 3 simple steps.
        </p>

        <div className="process-flow">
          <div className="process-step">
            <div className="step-icon">🔗</div>
            <div className="step-number">01</div>
            <h3 className="step-title">Initialize SDK</h3>
            <p className="step-description">
              Connect your user's wallet with just 3 lines of code.
              The SDK handles all ERC-4337 complexity.
            </p>
          </div>

          <div className="process-connector">
            <div className="connector-line"></div>
            <div className="connector-arrow">→</div>
          </div>

          <div className="process-step">
            <div className="step-icon">✍️</div>
            <div className="step-number">02</div>
            <h3 className="step-title">Backend Signs</h3>
            <p className="step-description">
              Your backend signing service verifies the UserOperation and
              returns a signature authorizing gas sponsorship.
            </p>
          </div>

          <div className="process-connector">
            <div className="connector-line"></div>
            <div className="connector-arrow">→</div>
          </div>

          <div className="process-step">
            <div className="step-icon">🚀</div>
            <div className="step-number">03</div>
            <h3 className="step-title">dApp Pays Gas</h3>
            <p className="step-description">
              The bundler includes your transaction on Conflux eSpace.
              Your dApp pays the CFX gas - user transacts for free!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;