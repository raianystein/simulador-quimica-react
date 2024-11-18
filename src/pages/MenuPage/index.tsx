import React from "react";
import Header from "../../components/Header";
import "../../styles/menu.css";
import { Link } from "react-router-dom";

export default function MenuPage() {
  return (
    <div>
      <Header/>
      <div className="content">
        <div className="simulation-info">
          <h2>Simulações em físico química</h2>
          <ul className="informations">
            <li>Simulação de processos isotérmicos, isovolumétricos e isobáricos para o gás monoatômico perfeito.</li>
            <li>Cálculo do trabalho (W), variação da energia interna (ΔU) e a quantidade de calor (Q).</li>
          </ul>
          <button className="button-menu">
            <Link to="/simulation/perfect-gas-law" className="link">
              Entrar
            </Link>
          </button>
        </div>
        <div className="simulation-info">
          <h2>Laboratório de Química</h2>
            <ul className="informations">
              <li>Roteiros para aulas de laborátorio da disciplina de Química Geral Experimental ministradas pelo professor Roberto Amado segunda e quarta às 18h .</li>
            </ul>
          <button className="button-menu">
            <Link to="/menu"className="link">
              Entrar
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
