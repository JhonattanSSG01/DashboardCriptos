// Principalmente se importa lo necesario que se vaya a utilizar en este componente principal.
import { FaPlay } from "react-icons/fa"; // Libreria para poder utilizar iconos
import "./cardPrincipal.css"; // Estilos Css
import { deleteDec, colorDec } from "./App"; // Se importa las funciones especificas para el color y formato de deciales de los porcentajes.
import Graph from "./Graph"; // Componente para el tema de visualizacion de la grafica.

/// El export en funciones nombradas, se refiere a que se exporta la sentencia especifica que esta maneje.
// Coomo parametro se le pasa algunos datos del json que nos trajo la peticion de la API
function CardPrincipal({
  json: {
    id,
    symbol,
    current_price,
    image,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    price_change_percentage_30d_in_currency,
    /* price_change_percentage_90d_in_currency, */
    price_change_percentage_1y_in_currency,
  },
  cur = "usd",
}) {
  //Retrona un HTML
  return (
    // Las etiquetas especiales llamadas <> </>, ayudan a pintar un componente sin necesidad de que se cree una etiqueta padre.
    <>
      <article className="cripto-first">
        <div className="cripto-title">
          <img src={image} alt="Icono de cripto" />{" "}
          {/* Imagen principal de la moneda */}
          <h2>
            {symbol} - {current_price} {cur}
          </h2>{" "}
          {/* Simbolo(Abreviacion), precio actual y la moneda seleccionada */}
          {/* <select name="select-percentage" id="select-percentage">
                        <option value="value1" selected>12%</option>
                        <option value="value2">18%</option>
                        <option value="value3">20%</option>
                    </select> */}
          <h2>
            <FaPlay
              className={`icon-arrow ${colorDec(
                price_change_percentage_30d_in_currency
              )}`}
            />
            {deleteDec(price_change_percentage_30d_in_currency, 2)}%
          </h2>{" "}
          {/* Porcentaje de subida o bajada de la moneda con el formato de solo dos decimales */}
        </div>
        <div className="graphic">
          <Graph type={0} coin={id} currency={cur} />{" "}
          {/* Grafica representativa a la moneda con datos requeridos, se le pasa como props el id y el porcentaje */}
        </div>
        <div className="capitalization">
          <h2>Capitalización</h2>
          {/* Tabla con prcentajes de caida o subida de la moneda en periodos de tiempo, esos porcentajes tiene el color que corresponde a sies mayor o menor a 0 y solo se visualiza dos decimales */}
          <table className="capitalization-table">
            <thead>
              <tr>
                <th>1h</th>
                <th>24h</th>
                <th>7d</th>
                <th>1m</th>
                <th>1y</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className={colorDec(price_change_percentage_1h_in_currency)}
                >
                  {deleteDec(price_change_percentage_1h_in_currency, 2)}%
                </td>
                <td
                  className={colorDec(price_change_percentage_24h_in_currency)}
                >
                  {deleteDec(price_change_percentage_24h_in_currency, 2)}%
                </td>
                <td
                  className={colorDec(price_change_percentage_7d_in_currency)}
                >
                  {deleteDec(price_change_percentage_7d_in_currency, 2)}%
                </td>
                <td
                  className={colorDec(price_change_percentage_30d_in_currency)}
                >
                  {deleteDec(price_change_percentage_30d_in_currency, 2)}%
                </td>
                <td
                  className={colorDec(price_change_percentage_1y_in_currency)}
                >
                  {deleteDec(price_change_percentage_1y_in_currency, 2)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

export default CardPrincipal; // Se exporta todo el compoennte para poder lo usar en el componente App para su visualizacion en la vista principal.
