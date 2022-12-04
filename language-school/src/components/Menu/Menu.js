import React from 'react'
import { Link } from "react-router-dom";
import "./Menu.scss"

 const Menu = () => {
  return (
    <div className="menu">
      <div>Menu</div>
      <Link to="/timetables">Timetables</Link>
      <Link to="/teachers">Teachers</Link>
      <Link to="/subjects">Subjects</Link>
      <Link to="/clasrooms">Clasrooms</Link>
    </div>
  );
}
export default Menu;