// Principalmente se importa lo necesario que se vaya a utilizar en este componente principal.
import React from "react";
import "./tableCoins.css"; // Estilos de CSS
import CoinRow from "./CoinRow"; // Componente para el tema de visualizacion sobre las filas de cada moneda.

/// El export en funciones nombradas, se refiere a que se exporta la sentencia especifica que esta maneje.
// Se da como parametro el dato de la moneda destructurado
function TableCoins({ coins }) {
  console.log(coins);
  // Retorna una tabla con los datos requeridos
  return (
    // La tabla contiene informacion de cada moneda que se quiera visualizar despues de la tarjeta principal que se encuentra en la posicion 0 de la lista.
    <table className="table_coins">
      <thead>
        <tr>
          <td>#</td>
          <td>Moneda</td>
          <td>Precio</td>
          <td>24h</td>
          <td>Vol. total</td>
          <td>Cap. mercado</td>
          <td>Ultimos 7 dias</td>
        </tr>
      </thead>
      <tbody>
        {/* Recorre la lista con los datos almacenados y devuelve un componente el cual, tiene la logica para poder visualizar cada fila con diferente moneda. */}
        {coins.map((coin, index) => (
          /* Se le pasa props las cuales son: la moneda, el index en la key para identificar que ítems han cambiado, son agregados o son eliminados y
             ese index empezara el conteo desde uno.*/
          <CoinRow coin={coin} key={index} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
}

export default TableCoins; // Se exporta todo el compoennte para poder lo usar en el componente App para que se visualice en la vista principal.
