import React from "react";
import MenuLinks from "./MenuLinks";
import { useState } from "react";

const MenuHamburger = () => {
  const [open, setOpen] = useState(true);

  const hamburgerIcon = (
    <span
      className="material-symbols-outlined hamburger"
      onClick={() => setOpen(!open)}
    >
     menu
    </span>
  );

    const closeIcon = (
      <span
        className="material-symbols-outlined hamburger"
        onClick={() => setOpen(!open)}
      >
        menu
      </span>
    );

  return (
    <>
      <div className="hamburgerMenu">{open ? closeIcon : hamburgerIcon}</div>
      <nav >
        {open && <MenuLinks className="menuHamburger__all" />}
      </nav>
    </>
  );
};

export default MenuHamburger;
