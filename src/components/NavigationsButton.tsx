import React from "react";
import { useNavigation } from "../hooks/useNavigation";

interface NavigationButtonProps {
  path: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: "default" | "premium" | "success" | "primary" | "secondary";
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  path,
  children,
  className = "",
  style,
  variant = "default"
}) => {
  const handleClick = useNavigation();
  
  const getVariantClass = () => {
    switch (variant) {
      case "premium":
        return "home-btn home-btn-premium";
      case "success":
        return "home-btn home-btn-success";
      case "primary":
        return "home-btn home-btn-primary";
      case "secondary":
        return "home-btn home-btn-secondary";
      default:
        return "home-btn";
    }
  };

  return (
    <button
      onClick={handleClick(path)}
      className={`${getVariantClass()} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default NavigationButton;