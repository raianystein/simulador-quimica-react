import React, { useContext, useState } from 'react';
import './styles.css';
import MyContext from '../../contexts/MyContext';

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);;
  const {setFinalPression, setFinalTemperature, setFinalVolume, 
    setInitialPression, setInitialTemperature, setInitialVolume,
    setQ, setW, setU,
    setProcessType} = useContext(MyContext);

  const resetValues = () => {
    setFinalPression("");
    setFinalTemperature("");
    setFinalVolume("");
    setInitialPression("");
    setInitialTemperature("");
    setInitialVolume("");
    setQ("0");
    setW("0");
    setU("0");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setProcessType(option);
    resetValues();
    setIsOpen(false);
  };

  return (
    ( 
      <div className="dropdown">
        <button className="dropdown-toggle" onClick={toggleDropdown} type="button">
          {selectedOption ? selectedOption : 'Selecione o tipo de processo'}
          {isOpen ? <div>&#9651;</div> : <div>&#9661;</div>}
        </button>
        {isOpen && (
          <ul className="dropdown-menu">
            <li onClick={() => handleOptionClick('Processo isobárico')}>Processo isobárico</li>
            <li onClick={() => handleOptionClick('Processo isotérmico')}>Processo isotérmico</li>
            <li onClick={() => handleOptionClick('Processo isovolumétrico')}>Processo isovolumétrico</li>
          </ul>
        )}
      </div>
    )
  )
};