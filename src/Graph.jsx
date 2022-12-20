// Principalmente se importa lo necesario que se vaya a utilizar en este componente principal.
// Este componente se encarga de pintar los graficos requeridos de cada moneda.
import "./Graph.css"; // Estilos Css
import { useEffect, useState, useRef } from "react"; // Los hooks que se usan para inicializar el estado a las variables(useState), controlar ese estado cada vez que se renderiza un componente(useEffect) y (useRef) nos permite guardar la referencia a elementos del DOM y acceder a los métodos de su API y nos permite mantener cualquier valor mutable.
import { Line } from "react-chartjs-2"; // Libreria para el uso de graficos lineales.

// Libreria para el uso de graficos con datos requeridos.
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

import moment from "moment/moment"; // Libreria para capturar las fechas que se necesiten en la graficas.

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
/// El export en funciones nombradas, se refiere a que se exporta la sentencia especifica que esta maneje.
// Esta function se encarga de pintar la grafica correspondiente
export default function Graph({
  type = 1, // Existen dos graficas, la 1 son graficas gradientes y la 0 graficas son solo la linea.
  coin = "bitcoin", // Nombre de la moneda
  currency = "usd", // Por default es en moneda USD(dolar)
  days = 30, // Calcula la bajada y subida de la moneda durante un periodo.
  color = "#04D99D", // Color
}) {
  const chartStyle = {
    border: {
      display: false, // Se le quita el borde
    },
    grid: {
      display: false, // Se le quita la cuadricula que tiene por defecto
    },
    ticks: {
      display: false,
    },
  };
  // Se consume de nuevo la API para la correspondiente grafica
  let url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`;
  let data, options;
  const [prices, setPrices] = useState(); // Almacena todos los valores del array(el precio de la moneda) que llegue en la variable.
  const [dates, setDates] = useState(); // Almacena todos los valores del array(la decha de la moneda) que llegue en la variable.
  const [gradient, setGradient] = useState(); // Almacena todos los valores del array(el color gradiente) que llegue en la variable.
  async function getData() {
    // La declaración try...catch señala un bloque de instrucciones a intentar (try), y especifica una respuesta si se produce una excepción (catch). El propósito de un bloque try-catch es detectar y controlar una excepción generada por código en funcionamiento.
    try {
      const response = await fetch(url); // Peticion de la API
      const json = await response.json(); // Se pasa a un formato json
      setPrices(json.prices.map((item) => Math.round(item[1]))); // Recorremos los precios y se redondea el valor
      setDates(json.prices.map((item) => moment.unix(item[0]).format("MM-DD"))); // Recorremos la fecha para cambiar el formato de la fecha cada vez que se haga la peticion a la API.
    } catch (e) {
      console.log("error:", e);
    }
  }
  const chartRef = useRef(null);

  // Cada vez que el componente app se renderiza, se realiza la consulta a la API, se asigna un segundo parametro que es una lista vacia, la cual, significa que no se llamara constantemente, despues de que se haya consultado una vez.
  useEffect((_) => {
    getData();
    // Se visualiza en un canvas
    const canvas = chartRef.current.firstChild;
    let BGgradient = canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, canvas.height);
    BGgradient.addColorStop(0, "rgba(4, 191, 157, 1)");
    BGgradient.addColorStop(1, "rgba(4, 191, 157, 0)");
    setGradient(BGgradient); // Guarda el gradiente en la variable gradient.
  }, []);

  // Se realiza un switch para validar el tipo de grafica que llegue si es 1 o 0
  switch (type) {
    case 0:
      options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              callback: function (value, index, ticks) {
                return `$${value
                  .toString()
                  .replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    "."
                  )} ${currency.toUpperCase()}`;
              },
            },
          },
        },
      };
      data = {
        labels: dates,
        datasets: [
          {
            data: prices,
            borderColor: color,
            backgroundColor: gradient,
            tension: 0.4,
            pointRadius: 0,
            fill: true,
          },
        ],
      };
      break;
    case 1:
      options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
        },
        scales: {
          x: chartStyle,
          y: chartStyle,
        },
      };
      data = {
        labels: dates,
        datasets: [
          {
            data: prices,
            borderColor: color,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      };
      break;
  }
  return (
    <div ref={chartRef} className="graph">
      <Line data={data} options={options} />{" "}
      {/* Componente de la libreria react-chartjs-2 para pintar la grafica con los datos que se le pasen */}
    </div>
  );
}
