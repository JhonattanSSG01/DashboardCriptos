// Principalmente se importa lo necesario que se vaya a utilizar en este componente principal.
import "./Card.css"; // Estilos de CSS
import Graph from "./Graph"; // Componente para el tema de visualizacion de la grafica.
import { colorDec } from "./App"; // Se importa una funcion especifica para el color de los porcentajes.

/// El export en funciones nombradas, se refiere a que se exporta la sentencia especifica que esta maneje.
// Se le da como parametros los datos necesarios pero estos datos se destructuran del json para mejor manipulacion. Se conoce como interpretar codigo con estas llaves {}
export default function Card({ coinId, cur, porcentaje, price, img }) {
  // Retorna un div HTML lo cual, es la tarjeta con los datos asignados y se repiten las veces se requieran.
  return (
    <div className="card">
      <img src={img} alt="" /> {/* Imagen de la moneda respectiva */}
      <div className="con-main">
        <div className="con-title">
          <h2 className={`price ${colorDec(porcentaje)}`}>{price}</h2>{" "}
          {/* Precio y su color */}
          <h4 className={`porcentajes ${colorDec(porcentaje)}`}>
            {porcentaje}%
          </h4>{" "}
          {/* Porcentaje y su color */}
        </div>
        {/* El componente Graph tiene la logica para pintar cada grafica que se necesite y esto depende de los datos */}
        <Graph coin={coinId} currency={cur} color={colorDec(porcentaje)} />
      </div>
    </div>
  );
}
