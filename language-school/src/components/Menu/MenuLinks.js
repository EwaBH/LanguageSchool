import React from "react";
import { Link } from "react-router-dom";

const MenuLinks = (props) => {
  return (
    <div
      className="menu"
      onClick={() => props.isMobile && props.closeMobileMenu()}
    >
      <Link className="menuLink" to="/">
        <span className="material-symbols-outlined menu__icon">home</span>
        <span className="menu__text"> strona główna </span>
      </Link>
      <Link className="menuLink" to="/timetables">
        <span className="material-symbols-outlined menu__icon">
          calendar_month
        </span>
        <span className="menu__text">plan zajęć</span>
      </Link>
      <Link className="menuLink" to="/teachers">
        <span className="material-symbols-outlined menu__icon">face</span>
        <span className="menu__text">Nauczyciele</span>
      </Link>
      <Link className="menuLink" to="/subjects">
        <span className="material-symbols-outlined menu__icon">
          auto_stories
        </span>
        <span className="menu__text"> Przedmioty</span>
      </Link>
      <Link className="menuLink" to="/classrooms">
        <span className="material-symbols-outlined menu__icon">home_pin</span>
        <span className="menu__text">Sale lekcyjne</span>
      </Link>
    </div>
  );
};

export default MenuLinks;
