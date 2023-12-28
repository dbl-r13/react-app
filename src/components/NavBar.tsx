import React from "react";

interface NavBarProps {
  cartItemsCount: number;
}

const NavBar = ({ cartItemsCount }: NavBarProps) => {
  return <h1>NavBar: {cartItemsCount}</h1>;
};

export default NavBar;
