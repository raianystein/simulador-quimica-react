import React from "react";
import './styles.css';
import { Link } from "react-router-dom";

export default function Footer() {
  return(
    <div className="container-footer">
      <div className="image-background-footer"></div>
      <div className="contacts">
        <h3>Email:</h3>
        <h4>rstein.dev@gmail.com</h4>
      </div>
      <div className="contacts">
        <h3>Repositório GitHub:</h3>
        <h4><a href="https://github.com/raianystein" target="_blank">GitHub</a></h4>
      </div>
    </div>
  )
}