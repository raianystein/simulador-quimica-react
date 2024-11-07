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
    const [tempI, setTempI] = useState(0);
    const [tempF, setTempF] = useState(0);

    useEffect(() => { 
      if (processType=="Processo isobárico") {setFinalPression(initialPression)}
      if (processType=="Processo isotérmico") {setFinalTemperature(initialTemperature)}
      if (processType=="Processo isovolumétrico") {setFinalVolume(initialVolume)}

      const volumeInicial = initialVolume ? parseFloat(initialVolume) : null;
      const pressaoInicial = initialPression ? parseFloat(initialPression) : null;
      const temperaturaInicial = tempI;
      const volumeFinal = finalVolume ? parseFloat(finalVolume) : null;
      const pressaoFinal = finalPression ? parseFloat(finalPression) : null;
      const temperaturaFinal = tempF;

      if (processType=="Processo isobárico" && volumeInicial && pressaoInicial && temperaturaInicial!=0) {
        constChanged == "initialVolume" ? 
          setInitialTemperature((((pressaoInicial * volumeInicial) / R)-273.15).toPrecision(4)) :
          setInitialVolume(((R*temperaturaInicial)/pressaoInicial).toPrecision(4))
      }
      if (processType=="Processo isobárico" && volumeFinal && pressaoFinal && temperaturaFinal!=0) {
        constChanged == "finalVolume" ? 
          setFinalTemperature((((pressaoFinal * volumeFinal) / R)-273.15).toPrecision(4)) :
          setFinalVolume(((R*temperaturaFinal)/pressaoFinal).toPrecision(4))
      }
      if (processType=="Processo isotérmico" && volumeInicial && pressaoInicial && temperaturaInicial!=0) {
        constChanged == "initialVolume" ? 
          setInitialPression(((R * temperaturaInicial) / volumeInicial).toPrecision(4)) :
          setInitialVolume(((R*temperaturaInicial)/pressaoInicial).toPrecision(4))
      }
      if (processType=="Processo isotérmico" && volumeFinal && pressaoFinal && temperaturaFinal!=0) {
        constChanged == "finalVolume" ? 
          setFinalPression(((R * temperaturaFinal) / volumeFinal).toPrecision(4)) :
          setFinalVolume(((R*temperaturaFinal)/pressaoFinal).toPrecision(4));
      }
      if (processType=="Processo isovolumétrico" && volumeInicial && pressaoInicial && temperaturaInicial!=0) {
        constChanged == "initialPression" ? 
        setInitialTemperature((((pressaoInicial * volumeInicial) / R)-273.15).toPrecision(4)) :
        setInitialPression(((R * temperaturaInicial) / volumeInicial).toPrecision(4))
      }
      if (processType=="Processo isovolumétrico" && volumeFinal && pressaoFinal && temperaturaFinal!=0) {
        constChanged == "finalPression" ? 
          setFinalTemperature((((pressaoFinal * volumeFinal) / R)-273.15).toPrecision(4)) :
          setFinalPression(((R *(temperaturaFinal+273.15))/volumeFinal).toPrecision(4))
      }

      if(volumeInicial!=null && pressaoInicial!=null && temperaturaInicial==0) {
        var temperatura = (((pressaoInicial * volumeInicial) / R)-273.15);  
        setInitialTemperature(temperatura.toPrecision(4));
      }
      if(volumeInicial!=null && pressaoInicial==null && temperaturaInicial!=0) {
        var pressao= ((R*(temperaturaInicial))/ volumeInicial);
        setInitialPression(pressao.toPrecision(4));
      }
      if(volumeInicial==null && pressaoInicial!=null && temperaturaInicial!=0) {
        var volume= ((R * (temperaturaInicial)) / pressaoInicial);
        setInitialVolume(volume.toPrecision(4));
      }

      if(volumeFinal!=null && pressaoFinal!=null && temperaturaFinal==0) {
        var temperatura = (((pressaoFinal * volumeFinal) / R)-273.15);  
        setFinalTemperature(temperatura.toPrecision(4));
      }
      if(volumeFinal!=null && pressaoFinal==null && temperaturaFinal!=0) {
        var pressao= ((R*(temperaturaFinal))/ volumeFinal);
        setFinalPression(pressao.toPrecision(4));
      }
      if(volumeFinal==null && pressaoFinal!=null && temperaturaFinal!=0) {
        var volume= ((R * (temperaturaFinal)) / pressaoFinal);
        setFinalVolume(volume.toPrecision(4));
      }
      
    }, [finalPression, finalVolume, initialVolume, initialPression, tempI, tempF])

    useEffect(() => {
      setTempI(0);
      setTempF(0)
    }, [processType])

    const handleInitialChange = (e) => {
      if(processType == "") {
        return alert("Selecione um tipo de processo.")
      } else {
        if (e.target.name=="initialPression") {
          if (parseFloat(e.target.value) <=0) {
            return alert("Selecione um valor maior que zero.")
          } else {setInitialPression(e.target.value); setConstChanged(e.target.name);}
        }
        if (e.target.name=="initialTemperature") {
          setInitialTemperature(e.target.value);
          e.target.value == "0" ? (setTempI(273.15)) : setTempI(parseFloat(e.target.value)+273.15);
          setConstChanged(e.target.name);
          if (processType=="Processo isotérmico") {setFinalTemperature(e.target.value); setTempF(parseFloat(e.target.value)+273.15)}
        }
        if (e.target.name=="initialVolume") {
          if (parseFloat(e.target.value) <=0) {
            return alert("Selecione um valor maior que zero.")
          } else {setInitialVolume(e.target.value); setConstChanged(e.target.name);}
        }
      }
    };

    const handleFinalChange = (e) => {
      if(processType == "") {
        return alert("Selecione um tipo de processo.")
      } else {
        if (e.target.name=="finalPression") {
          if (parseFloat(e.target.value) <=0) {
            return alert("Selecione um valor maior que zero.")
          } else {setFinalPression(e.target.value); setConstChanged(e.target.name);}
        }
        if (e.target.name=="finalTemperature") {
          setFinalTemperature(e.target.value); 
          e.target.value == "0" ? (setTempF(273.15)) : setTempF(parseFloat(e.target.value)+273.15);
          setConstChanged(e.target.name)
        }
        if (e.target.name=="finalVolume") {
          if (parseFloat(e.target.value) <=0) {
            return alert("Selecione um valor maior que zero.")
          } else {setFinalVolume(e.target.value); setConstChanged(e.target.name)}
        }
      }
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
