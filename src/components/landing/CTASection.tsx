import React from "react";
import NavigationButton from "../NavigationsButton";

const CTASection: React.FC = () => {
  return (
    <div className="section-cta">
      <div className="container">
        <h2 className="cta-title">Ready to Enable Gasless Transactions?</h2>
        <p className="cta-description">
          Install the SDK, connect your backend, and let your dApp sponsor user gas.
          No more CFX requirements for users.
        </p>
        <div className="cta-actions">
          <NavigationButton
            path="/docs"
            variant="premium"
            style={{
              fontSize: '1.2rem',
              padding: '1rem 2.5rem'
            }}
          >
            Get Started
          </NavigationButton>
          <div className="cta-links">
            <a href="/docs" className="cta-link">
              Read Documentation →
            </a>
            <a href="https://github.com/conflux-paymaster" className="cta-link">
              GitHub →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;