import React from "react";
import "../../styles/simulation.css";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Chart from "../../components/Chart";

export default function SimulationPage() {
  return (
    <div className="container-simulation-area">
      <Header/>
      <h1>Simulação de processos termodinâmicos reversíveis para gases perfeitos monoatômicos</h1>
      <div className="content-simulation-area">
        <Input/>
        <Chart/>
      </div>
    </div>
  );
}