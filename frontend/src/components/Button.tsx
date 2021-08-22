import React from "react";

type ButtonType = "button" | "submit";
interface ButtonProps {
  title: string;
  type: ButtonType;
  disabled: boolean;
  className: string;
}

const Button = ({ title, type, disabled, className }: ButtonProps) => {
  return (
    <button type={type} disabled={disabled} className={className}>
      {title}
    </button>
  );
};

Button.defaultProps = {
  type: "submit",
};

export default Button;
