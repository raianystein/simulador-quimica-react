// QWUCalculator.js
import React, { useContext, useEffect} from 'react';
import './styles.css'; // Arquivo de estilo
import MyContext from '../../contexts/MyContext';
var R = 0.08206;
var Cv = 12.47;
let fatorConversaoParaJoule = 101.35;

export default function Calculator() {
  const {finalTemperature, finalVolume,
    initialPression, initialTemperature, initialVolume,
    processType, Q,W,U, setQ, setW, setU,} = useContext(MyContext);

  useEffect(() => {
    if (processType=="Processo isobárico" && finalTemperature!="" && initialTemperature!="" && finalVolume!="" && initialVolume!="" && initialPression!="") {
      var volumeFinal = parseFloat(finalVolume);
      var volumeInicial = parseFloat(initialVolume);
      var temperaturaInicial = parseFloat(initialTemperature);
      var temperaturaFinal = parseFloat(finalTemperature);
      var pressaoInicial = parseFloat(initialPression);
  
      var energiaInterna = Cv*(temperaturaFinal-temperaturaInicial);
      var trabalho = -pressaoInicial*(volumeFinal-volumeInicial)*fatorConversaoParaJoule;
      var calor = energiaInterna - trabalho;
  
      setQ(calor.toPrecision(4));
      setW(trabalho.toPrecision(4));
      setU(energiaInterna.toPrecision(4))
    }
  
    if (processType=="Processo isotérmico" && initialVolume!="" && finalVolume!="" && initialTemperature!="") {
      var volumeFinal = parseFloat(finalVolume);
      var volumeInicial = parseFloat(initialVolume);
      var temperaturaInicial = parseFloat(initialTemperature);
  
      let div = volumeFinal / volumeInicial;
      var trabalho = -R*(temperaturaInicial+273.15)*Math.log(div)*fatorConversaoParaJoule;
  
      setU("0");
      setW(trabalho.toPrecision(4));
      setQ((-trabalho).toPrecision(4));
    }
  
    if (processType=="Processo isovolumétrico" && initialTemperature!="" && finalTemperature!="") {
      var temperaturaInicial = parseFloat(initialTemperature);
      var temperaturaFinal = parseFloat(finalTemperature);
      
      var calor = (Cv*(temperaturaFinal-temperaturaInicial));
  
      setQ(calor.toPrecision(4));
      setU(calor.toPrecision(4));
      setW("0");
    }
  }, [initialPression, initialTemperature, initialVolume, finalTemperature, finalVolume, processType, setQ, setW, setU])

  return (
    <div className="calculator-container">
      <div className="results">
        <div className="result-block">
          <h3>Q (Calor)</h3>
          <p>{Q} J</p>
        </div>
        <div className="result-block">
          <h3>W (Trabalho)</h3>
          <p>{W} J</p>
        </div>
        <div className="result-block">
          <h3>ΔU (Energia Interna)</h3>
          <p>{U} J</p>
        </div>
      </div>
    </div>
  );
};
