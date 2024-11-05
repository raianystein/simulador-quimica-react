import React from "react";
import LoginArea from "../../components/LoginArea";
import '../../styles/home.css';
import Footer from "../../components/Footer";
import InfoDetails from "../../components/InfoDetails";

export default function Home() {
  return (
    <div className="container-home">
      <div className="login-content">
        <h1>Protótipo de ferramenta virtual para auxiliar estudos e simulações em físico-química</h1>
        <LoginArea/>
      </div>
      <InfoDetails/>
      <Footer/>
    </div>
  );
}