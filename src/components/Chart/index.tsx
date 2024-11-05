import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import Chart from 'react-apexcharts';
import MyContext from '../../contexts/MyContext';
import { ApexOptions } from 'apexcharts';

const R = 0.08206;

interface ChartData {
  series: { name: string; data: number[] }[];
  options: ApexOptions; // Usando ApexOptions diretamente
}

export default function MyChart() {
  const {
    finalPression,
    finalTemperature,
    finalVolume,
    initialPression,
    initialTemperature,
    initialVolume,
    processType,
  } = useContext(MyContext);

  const [chartData, setChartData] = useState<ChartData>({
    series: [{
      name: 'Dados Iniciais',
      data: [],
    }],
    options: {
      chart: {
        type: 'line',
        height: '100%'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      title: {
          text: processType || "",
          align: 'center'
      },
      xaxis: {
        title: {
          text: processType === 'Processo isotérmico' ? 'Volume (L)' : 'Temperatura (°C)',
        },
        categories: [],
      },
      yaxis: {
        title: {
          text: processType === 'Processo isobárico' ? 'Volume (L)' : 'Pressão (atm)',
        },
      },
    },
  });

  useEffect(() => {
    const volumeInicial = initialVolume ? parseFloat(initialVolume) : null;
    const pressaoInicial = initialPression ? parseFloat(initialPression) : null;
    const temperaturaInicial = initialTemperature ? parseFloat(initialTemperature) : null;
    const volumeFinal = finalVolume ? parseFloat(finalVolume) : null;
    const temperaturaFinal = finalTemperature ? parseFloat(finalTemperature) : null;

    const intervaloX: string[] = [];
    const intervaloY: number[] = []; 

    if (processType === 'Processo isotérmico' && volumeFinal != null && volumeInicial != null && temperaturaInicial != null) {
      const incremento = Math.abs((volumeFinal - volumeInicial) / 10);
      for (let i = 0; i <= 11; i += 1) {
        const volumeCalculado = (volumeInicial > volumeFinal ? volumeFinal : volumeInicial) + i * incremento;
        intervaloX.push(volumeCalculado.toPrecision(4));
        const pressaoCalculada = (R * (temperaturaInicial + 273.15)) / volumeCalculado;
        intervaloY.push(parseFloat(pressaoCalculada.toPrecision(4)));
      }
    } else if (processType === 'Processo isobárico' && temperaturaFinal != null && temperaturaInicial != null && pressaoInicial != null) {
      const incrementoT = Math.abs((temperaturaFinal - temperaturaInicial) / 10);
      for (let i = 0; i <= 11; i += 1) {
        const temperaturaCalculada = (temperaturaInicial > temperaturaFinal ? temperaturaFinal : temperaturaInicial) + i * incrementoT;
        intervaloX.push(temperaturaCalculada.toPrecision(4));
        const volumeCalculado = (R * (temperaturaCalculada + 273.15)) / pressaoInicial;
        intervaloY.push(parseFloat(volumeCalculado.toPrecision(4)));
      }
    } else if (processType === 'Processo isovolumétrico' && temperaturaFinal != null && temperaturaInicial != null && volumeInicial != null) {
      const incrementoT = Math.abs((temperaturaFinal - temperaturaInicial) / 10);
      for (let i = 0; i <= 11; i += 1) {
        const temperaturaCalculada = (temperaturaInicial > temperaturaFinal ? temperaturaFinal : temperaturaInicial) + i * incrementoT;
        intervaloX.push(temperaturaCalculada.toPrecision(4));
        const pressaoCalculada = (R * (temperaturaCalculada + 273.15)) / volumeInicial;
        intervaloY.push(parseFloat(pressaoCalculada.toPrecision(4)));
      }
    }

    setChartData({
      series: [{
        name: processType || 'Sem dados a avaliar',
        data: intervaloY.length > 0 ? intervaloY : Array(6).fill(0),
      }],
      options: {
        ...chartData.options,
        xaxis: {
          ...chartData.options.xaxis,
          categories: intervaloX.length > 0 ? intervaloX : Array(6).fill('0'),
        },
        title: {
          text: processType,
          align: 'center'
        },
      },
    });
  }, [processType, finalPression, finalTemperature, finalVolume, initialPression, initialTemperature, initialVolume]);

  return (
    <div className="chart-container">
      <Chart options={chartData.options} series={chartData.series} type="line" height="100%" />
    </div>
  );
}
