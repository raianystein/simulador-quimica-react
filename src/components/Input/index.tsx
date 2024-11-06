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

    const [constChanged, setConstChanged] = useState("");

    useEffect(() => {
      if (processType=="Processo isobárico") {setFinalPression(initialPression)}
      if (processType=="Processo isotérmico") {setFinalTemperature(initialTemperature)}
      if (processType=="Processo isovolumétrico") {setFinalVolume(initialVolume)}
      
      const volumeInicial = initialVolume ? parseFloat(initialVolume) : null;
      const pressaoInicial = initialPression ? parseFloat(initialPression) : null;
      const temperaturaInicial = initialTemperature ? parseFloat(initialTemperature) : null;
      const volumeFinal = finalVolume ? parseFloat(finalVolume) : null;
      const pressaoFinal = finalPression ? parseFloat(finalPression) : null;
      const temperaturaFinal = finalTemperature ? parseFloat(finalTemperature) : null;

      if (processType=="Processo isobárico" && volumeInicial && pressaoInicial && temperaturaInicial) {
        constChanged == "initialVolume" ? 
          setInitialTemperature((((pressaoInicial * volumeInicial) / R)-273.15).toPrecision(4)) :
          setInitialVolume(((R*(temperaturaInicial+273.15))/pressaoInicial).toPrecision(4))
      }
      if (processType=="Processo isobárico" && volumeFinal && pressaoFinal && temperaturaFinal) {
        constChanged == "finalVolume" ? 
          setFinalTemperature((((pressaoFinal* volumeFinal) / R)-273.15).toPrecision(4)) :
          setFinalVolume(((R*(temperaturaFinal+273.15))/pressaoFinal).toPrecision(4))
      }
      if (processType=="Processo isotérmico" && volumeInicial && pressaoInicial && temperaturaInicial) {
        constChanged == "initialVolume" ? 
          setInitialPression(((R * (temperaturaInicial+273.15)) / volumeInicial).toPrecision(4)) :
          setInitialVolume(((R*(temperaturaInicial+273.15))/pressaoInicial).toPrecision(4))
      }
      if (processType=="Processo isotérmico" && volumeFinal && pressaoFinal && temperaturaFinal) {
        constChanged == "finalVolume" ? 
          setFinalPression(((R * (temperaturaFinal+273.15)) / volumeFinal).toPrecision(4)) :
          setFinalVolume(((R*(temperaturaFinal+273.15))/pressaoFinal).toPrecision(4));
          console.log(finalPression);
          console.log(finalVolume);
          console.log(finalPression);
      }
      if (processType=="Processo isovolumétrico" && volumeInicial && pressaoInicial && temperaturaInicial) {
        constChanged == "initialPression" ? 
        setInitialTemperature((((pressaoInicial * volumeInicial) / R)-273.15).toPrecision(4)) :
        setInitialPression(((R * (temperaturaInicial+273.15)) / volumeInicial).toPrecision(4))
      }
      if (processType=="Processo isovolumétrico" && volumeFinal && pressaoFinal && temperaturaFinal) {
        constChanged == "finalPression" ? 
          setFinalTemperature((((pressaoFinal* volumeFinal) / R)-273.15).toPrecision(4)) :
          setFinalPression(((R *(temperaturaFinal+273.15))/volumeFinal).toPrecision(4))
      }

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
      if (e.target.name=="initialPression") {setInitialPression(e.target.value); setConstChanged(e.target.name);}
      if (e.target.name=="initialTemperature") {setInitialTemperature(e.target.value); setConstChanged(e.target.name);}
      if (e.target.name=="initialVolume") {setInitialVolume(e.target.value); setConstChanged(e.target.name);}
    };

    const handleFinalChange = (e) => {
      if (e.target.name=="finalPression") {setFinalPression(e.target.value); setConstChanged(e.target.name)}
      if (e.target.name=="finalTemperature") {setFinalTemperature(e.target.value); setConstChanged(e.target.name)}
      if (e.target.name=="finalVolume") {setFinalVolume(e.target.value); setConstChanged(e.target.name)}
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
