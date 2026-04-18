import React from "react";

const ComparisonTable: React.FC = () => {
  return (
    <div className="section-light">
      <div className="container">
        <h2 className="section-title">Why Conflux Paymaster SDK?</h2>
        <div className="comparison-table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-column">Feature</th>
                <th className="plan-column">Traditional eSpace</th>
                <th className="plan-column featured">Conflux Paymaster</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>User Gas Fees</td>
                <td>Users need CFX</td>
                <td>dApp sponsors all gas</td>
              </tr>
              <tr>
                <td>Onboarding</td>
                <td>CFX acquisition required</td>
                <td>Instant - no crypto needed</td>
              </tr>
              <tr>
                <td>SDK TypeScript</td>
                <td>Build from scratch</td>
                <td>Drop-in integration</td>
              </tr>
              <tr>
                <td>ERC-4337 Compatible</td>
                <td>Manual implementation</td>
                <td>Pre-built contracts</td>
              </tr>
              <tr>
                <td>Open Source</td>
                <td>Proprietary</td>
                <td>MIT License</td>
              </tr>
              <tr>
                <td>Conflux Native</td>
                <td>Custom adaptation</td>
                <td>Purpose-built for eSpace</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;