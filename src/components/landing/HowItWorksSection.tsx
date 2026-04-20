import React from "react";

const HowItWorksSection: React.FC = () => {
  return (
    <div className="section-light">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Gasless transactions with our multi-service architecture.
        </p>

        <div className="process-flow">
          <div className="process-step">
            <div className="step-icon">🔗</div>
            <div className="step-number">01</div>
            <h3 className="step-title">User Creates TX</h3>
            <p className="step-description">
              User signs a UserOperation locally. Their private key NEVER leaves their device.
            </p>
          </div>

          <div className="process-connector">
            <div className="connector-line"></div>
            <div className="connector-arrow">→</div>
          </div>

          <div className="process-step">
            <div className="step-icon">✍️</div>
            <div className="step-number">02</div>
            <h3 className="step-title">Signing Service</h3>
            <p className="step-description">
              Backend signs the paymaster signature to sponsor gas. Rate limiting & verifier validation.
            </p>
          </div>

          <div className="process-connector">
            <div className="connector-line"></div>
            <div className="connector-arrow">→</div>
          </div>

          <div className="process-step">
            <div className="step-icon">🚀</div>
            <div className="step-number">03</div>
            <h3 className="step-title">Relayer Submits</h3>
            <p className="step-description">
              Relayer service (has CFX) submits to EntryPoint. Paymaster reimburses from deposit!
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">🎉 LIVE PROOF - April 19, 2026</h3>
          <p className="text-purple-700">
            User's CFX balance was <strong>EXACTLY THE SAME</strong> before and after!
          </p>
          <ul className="text-sm text-purple-600 mt-2">
            <li>TX: 0x74ac671c67b9...60a17f9911e1d5995625d1c024f6</li>
            <li>Sender CFX Before: 0.20302872454897</li>
            <li>Sender CFX After: 0.20302872454897 ✅</li>
            <li>Change: <strong>0.00000000000000</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;