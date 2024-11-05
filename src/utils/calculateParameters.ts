import { useContext } from "react";
import MyContext from "../contexts/MyContext";
var R = 0.08206;
var Cv = 12.47;
let fatorConversaoParaJoule = 101.35;

export default function calculateParameters() {
    const {finalPression, setFinalPression,
        finalTemperature, setFinalTemperature,
        finalVolume, setFinalVolume,
        initialPression, setInitialPression,
        initialTemperature, setInitialTemperature,
        initialVolume, setInitialVolume,
        setQ, setW, setU,
        processType} = useContext(MyContext);

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
    console.log("Processo isobárico")
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
}