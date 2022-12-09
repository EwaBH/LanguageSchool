import React from "react";
import { Link } from "react-router-dom";

const MenuLinks = (props) => {
  return (
    <div
      className="menu"
      onClick={() => props.isMobile && props.closeMobileMenu()}
    >
      <Link className="menuLink" to="/">
        strona główna
      </Link>
      <Link className="menuLink" to="/timetables">
        <div>plan zajęć</div>
      </Link>
      <Link className="menuLink" to="/teachers">
        Nauczyciele
      </Link>
      <Link className="menuLink" to="/subjects">
        Przedmioty
      </Link>
      <Link className="menuLink" to="/classrooms">
        Sale lekcyjne
      </Link>
    </div>
  );
};

export default MenuLinks;
