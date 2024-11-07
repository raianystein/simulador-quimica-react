import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import Dropdown from '../Dropdown';
import Calculator from '../Calculator';
import MyContext from '../../contexts/MyContext';
var R = 0.08206;

export default function Input() {
  const {finalPression, setFinalPression,
    finalTemperature, setFinalTemperature,
    finalVolume, setFinalVolume,
    initialPression, setInitialPression,
    initialTemperature, setInitialTemperature,
    initialVolume, setInitialVolume,
    processType} = useContext(MyContext);

    useEffect(() => {
      const volumeInicial = initialVolume ? parseFloat(initialVolume) : null;
      const pressaoInicial = initialPression ? parseFloat(initialPression) : null;
      const temperaturaInicial = initialTemperature ? parseFloat(initialTemperature) : null;
      const volumeFinal = finalVolume ? parseFloat(finalVolume) : null;
      const pressaoFinal = finalPression ? parseFloat(finalPression) : null;
      const temperaturaFinal = finalTemperature ? parseFloat(finalTemperature) : null;

      if(volumeInicial!=null && pressaoInicial!=null && temperaturaInicial==null) {
        var temperatura = (((pressaoInicial * volumeInicial) / R)-273.15);  
        setInitialTemperature(temperatura.toPrecision(4));
      }
      if(volumeInicial!=null && pressaoInicial==null && temperaturaInicial!=null) {
        var pressao= ((R*(temperaturaInicial+273.15))/ volumeInicial);
        setInitialPression(pressao.toPrecision(4));
      }
      if(volumeInicial==null && pressaoInicial!=null && temperaturaInicial!=null) {
        var volume= ((R * (temperaturaInicial+273.15)) / pressaoInicial);
        setInitialVolume(volume.toPrecision(4));
      }
      if(volumeFinal!=null && pressaoFinal!=null && temperaturaFinal==null) {
        var temperatura = (((pressaoFinal * volumeFinal) / R)-273.15);  
        setFinalTemperature(temperatura.toPrecision(4));
      }
      if(volumeFinal!=null && pressaoFinal==null && temperaturaFinal!=null) {
        var pressao= ((R*(temperaturaFinal+273.15))/ volumeFinal);
        setFinalPression(pressao.toPrecision(4));
      }
      if(volumeFinal==null && pressaoFinal!=null && temperaturaFinal!=null) {
        var volume= ((R * (temperaturaFinal+273.15)) / pressaoFinal);
        setFinalVolume(volume.toPrecision(4));
      }
      
    }, [finalPression, finalTemperature, finalVolume, initialPression, initialTemperature, initialVolume])

    const handleInitialChange = (e) => {
      if (e.target.name=="initialPression") {setInitialPression(e.target.value)}
      if (e.target.name=="initialTemperature") {setInitialTemperature(e.target.value)}
      if (e.target.name=="initialVolume") {setInitialVolume(e.target.value)}

      if (processType=="Processo isobárico") {setFinalPression(initialPression)}
      if (processType=="Processo isotérmico") {setFinalTemperature(initialTemperature)}
      if (processType=="Processo isovolumétrico") {setFinalVolume(initialVolume)}
    };

    const handleFinalChange = (e) => {
      if (e.target.name=="finalPression") {setFinalPression(e.target.value)}
      if (e.target.name=="finalTemperature") {setFinalTemperature(e.target.value)}
      if (e.target.name=="finalVolume") {setFinalVolume(e.target.value)}
    };

  return (
    <form className="inputs-form">
      <Dropdown/>
      <div className="form-group">
        <h3>Estado Inicial</h3>
        <input
          type="number"
          name="initialPression"
          placeholder="Pressão inicial (atm)"
          min="1" max="5" step="2"
          value={initialPression==""? '' : initialPression}
          onChange={handleInitialChange}
        />
        <input
          type="number"
          name="initialTemperature"
          placeholder="Temperatura inicial (°C)"
          min="0" max="300" step="1"
          value={initialTemperature==""? '' : initialTemperature}
          onInputCapture={() => console.log("beforeInput")}
          onChange={handleInitialChange}
        />
        <input
          type="number"
          name="initialVolume"
          placeholder="Volume inicial (L)"
          min="1" max="50" step="1"
          value={initialVolume==''? '' : initialVolume}
          onChange={handleInitialChange}
        />
      </div>

      <div className="form-group">
        <h3>Estado Final</h3>
        <input
          type="number"
          name="finalPression"
          placeholder="Pressão final (atm)"
          min="1" max="5" step="2"
          value={(finalPression==null || processType=="Processo isobárico")? '' : finalPression}
          onChange={handleFinalChange}
          disabled={processType=="Processo isobárico"}
        />
        <input
          type="number"
          name="finalTemperature"
          placeholder="Temperatura final (°C)"
          min="0" max="300" step="1"
          value={(finalTemperature==null || processType=="Processo isotérmico")? '' : finalTemperature}
          onChange={handleFinalChange}
          disabled={processType=="Processo isotérmico"}
        />
        <input
          type="number"
          name="finalVolume"
          placeholder="Volume final (L)"
          min="1" max="50" step="1"
          value={(finalVolume==null || processType=="Processo isovolumétrico")? '' : finalVolume}
          onChange={handleFinalChange}
          disabled={processType=="Processo isovolumétrico"}
        />
      </div>
      <Calculator/>
    </form>
  );
};
