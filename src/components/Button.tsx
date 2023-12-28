import React from "react";
interface ButtonProp {
  children: string;
  color?: "primary" | "dark" | "success";
  onClick: () => void;
}

const Button = ({ children, onClick, color = "success" }: ButtonProp) => {
  return (
    <button className={`btn btn-${color}`} onClick={onClick} type="submit">
      {children}
    </button>
  );
};

export default Button;
