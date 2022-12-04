import React from "react";
import { Link } from "react-router-dom";
import "./Menu.scss";

const Menu = () => {
  return (
    <div className="menu">
      <div className="menu">Menu</div>
      <Link className="menuLink" to="/main">
        Main
      </Link>
      <Link className="menuLink" to="/timetables">
        <div>Timetables</div>
      </Link>
      <Link className="menuLink" to="/teachers">
        Teachers
      </Link>
      <Link className="menuLink" to="/subjects">
        Subjects
      </Link>
      <Link className="menuLink" to="/clasrooms">
        Clasrooms
      </Link>
    </div>
  );
};
export default Menu;
