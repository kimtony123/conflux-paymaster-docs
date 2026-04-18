import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="home-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="brand-logo">⚡</span>
            <div className="footer-brand-text">
              <h4>Conflux Paymaster SDK</h4>
              <p>Gasless Infrastructure for eSpace</p>
              <p className="footer-tagline">Users never need CFX - your dApp pays the gas.</p>
            </div>
          </div>

          <div className="footer-links">
            <h4>Product</h4>
            <ul>
              <li><a href="/docs">Docs</a></li>
              <li><a href="/docs#installation">Installation</a></li>
              <li><a href="/docs#quick-start">Quick Start</a></li>
              <li><a href="/docs#api-reference">API</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><a href="https://confluxpaymaster.org">Website</a></li>
              <li><a href="https://github.com/conflux-paymaster">GitHub</a></li>
              <li><a href="https://www.npmjs.com/package/@conflux-paymaster/sdk">npm</a></li>
              <li><a href="https://confluxscan.io">ConfluxScan</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Contract Addresses</h4>
            <ul>
              <li><a href="https://evmtestnet.confluxscan.io/address/0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789">EntryPoint</a></li>
              <li><a href="https://evmtestnet.confluxscan.io/address/0xcF2acdAEde6bb2549647CA5eE52fe5b86757d01E">Factory</a></li>
              <li><a href="https://evmtestnet.confluxscan.io/address/0x0cDE16Cf1fD5Bf2536069Aec8a2eF0832A27577B">Paymaster</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Conflux Paymaster SDK. Open source MIT license.</p>
          <div className="footer-social">
            <a href="https://github.com/conflux-paymaster" aria-label="GitHub">G</a>
            <a href="https://twitter.com/conflux_network" aria-label="Twitter">𝕏</a>
            <a href="https://confluxnetwork.org" aria-label="Conflux" className="conflux-badge">⛓️ CFX</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;