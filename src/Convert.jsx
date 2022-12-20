// Principalmente se importa lo necesario que se vaya a utilizar en este componente principal.
import { useEffect, useState } from "react";
import axios from "axios"; // Libreria para realizar una peticion a la API
import InputConvert from "./InputConvert"; // Componente en donde se ingresa el valor requerido para su eventual conversion
import { FaExchangeAlt } from "react-icons/fa"; // Libreria de Iconos
import "./Convert.css"; // Estilos Css
import { object } from "prop-types";

/// El export en funciones nombradas, se refiere a que se exporta la sentencia especifica que esta maneje.
export default function Convert() {
  const [coin, setCoin] = useState([]); // Estado inicial para la variable que almacena las monedas.
  const [selCoin1, setSelCoin1] = useState("btc"); // Estado inicial para la variable de la segunda seleccion de moneda
  const [selCoin2, setSelCoin2] = useState("eth"); // Estado inicial para la variable de la tercera seleccion de moneda
  const [mainTxt, setMainTxt] = useState(0);
  const [res, setRes] = useState(0);

  // Función asíncrona para obtener los datos de la API
  const getData = async () => {
    // Hacer petición a la API
    const result = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
    );

    // Establecer el valor de los datos obtenidos
    setCoin(result.data);

    // Mostrar datos obtenidos en consola
    // console.log(result.data)
  };
  // Obtener los datos cuando el componente cargue
  useEffect(() => {
    // Datos de la API
    getData();
  }, []);

  useEffect(
    (_) => {
      let a, b;
      coin.forEach(({ symbol, current_price }) => {
        if (symbol == selCoin1) {
          a = (mainTxt * current_price) / 1;
        } else if (symbol == selCoin2) {
          b = current_price;
        }
      });
      a ? setRes(a / b) : setRes(0);
    },
    [mainTxt, selCoin1, selCoin2]
  );
    // Retorna una estructura HTML para la correcta visualizacion de la conversion de monedas.
  return (
    <div className="contenedor">
      <h2>Comparación de Monedas</h2>

      <div className="input-convert">
        {/* Primer input con el valor y seleccion de la moneda */}
        <InputConvert
          coin={coin}
          fun={setSelCoin1}
          other={selCoin2}
          text={setMainTxt}
          type={0}
        />

        {/* Icono del intercambio de valores */}
        <FaExchangeAlt className="icono" />

        {/* Segundo input con el valor y seleccion de la moneda */}
        <InputConvert
          coin={coin}
          sel="eth"
          fun={setSelCoin2}
          other={selCoin1}
          result={res}
        />
      </div>
    </div>
  );
}
