import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
type TButtonProps = {
  children: React.ReactNode;
  size?: "lg" | "sm" | "md";
  theme?: "primary" | "secondary" | "cancel";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  to?: string;
};
function Button({
  children,
  size = "md",
  theme = "primary",
  className = "",
  onClick,
  to = "",
}: TButtonProps) {
  return to ? (
    <Link to={to} className={`btn btn-${theme} btn-${size} ${className}`}>
      {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`btn btn-${theme} btn-${size} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
