// Principalmente se importa lo necesario que se vaya a utilizar en este componente principal.
import React from "react";
import "./coinRow.css"; // Estilos de Css
import Graph from "./Graph"; // Componente para el tema de visualizacion de la grafica.
import { deleteDec, colorDec, numberF } from "./App"; // Se importa las dfunciones especificas para el color y la cantidad de decimales de los porcentajes, el formato de los valores.

/// El export en funciones nombradas, se refiere a que se exporta la sentencia especifica que esta maneje.
// Se le pasa como parametros destructurados la moneda y su indice correspondiente.
export default function CoinRow({ coin, index }) {
  console.log(index); // Validar por consola el valor del indice de cada moneda.
  // Retorna las filas con los datos requeridos
  return (
    <tr>
      <td>{index}</td> {/* 1ra columna - Indice de la moneda */}
      <td>
        {/* 2da columna - Imagen y nombre de la moneda */}
        <div className="coin_image_container">
          <img src={coin.image} title={coin.name} alt={coin.name} />
        </div>
      </td>
      <td>{numberF.format(coin.current_price)}US$</td>
      {/* 3ra columna - Precio formateado */}
      <td className={colorDec(coin.market_cap_change_percentage_24h)}>
        {deleteDec(coin.market_cap_change_percentage_24h, 2)}%
      </td>
      {/* 4ta columna - Procentaje formateado con dos decimales dependiendo si es menor a 0(rojo) o si es mayor a 0(verde) */}
      <td>{numberF.format(coin.total_volume)}US$</td>
      {/* 5ta columna - Volumen total de la moneda */}
      <td>{numberF.format(coin.market_cap)}US$</td>
      {/* 6ta columna - Capitalizacion en el mercado de la moneda */}
      <td>
        <Graph
          coin={coin.id}
          days={7}
          color={colorDec(coin.market_cap_change_percentage_24h)}
        />
      </td>
      {/* 7ma columna - Grafica respectiva que tare el componente Graph con su logica propuesta. */}
    </tr>
  );
}
