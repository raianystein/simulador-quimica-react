import React from "react";
import './styles.css';
import '../../assets/img/logo-iq.png';
import { Link } from "react-router-dom";

export default function Header() {
  return(
    <div className="container-header">
      <div className="image-background"></div>
      <div>
        <Link to="/menu">Menu</Link>
        <Link to="/">Home</Link>
      </div>
    </div>
  )
}