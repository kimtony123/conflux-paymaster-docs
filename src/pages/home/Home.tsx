import React, { } from "react";
import { useTheme } from "../../services/ThemeProvider";
import Navbar from "../../components/navbar/NavBar";
import HeroSection from "../../components/landing/HeroSection";
import UserGroupsSection from "../../components/landing/UserGroupsSection";
import HowItWorksSection from "../../components/landing/HowItWorksSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import ComparisonTable from "../../components/landing/ComparisonTable";
import CTASection from "../../components/landing/CTASection";
import Footer from "../../components/landing/Footer";

import "./Home.css";

const Home: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

 
  return (
    <div className="home-body">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <HeroSection />
      <UserGroupsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ComparisonTable />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;