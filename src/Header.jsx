// Principalmente se importa lo necesario que se vaya a utilizar en este componente principal.
import React from "react";
import "./Header.css"; // Estilo de Css
import { useTheme } from "./Context/ThemeProvider"; // Libreria para el modo claro y oscuro (Hook)

/// El export en funciones nombradas, se refiere a que se exporta la sentencia especifica que esta maneje.
// Como parametro se le pasa la moneda con que se visualizara la informacion y la lista desplegable con las diferentes monedas osibles para consultar
export default function Header({ currencys, fun, cur }) {
  const { theme, toggleTheme } = useTheme(); // Constante paa el tema del cambio de modo

  // Retorna una estructura HTML con datos requeridos y dinamicos
  return (
    <header className="app-header">
      <p>Crypto Stadistics</p>
      <div className="select-button">
        {/* Menu desplegable con las diferentes monedas disponibles para elegir */}
        <select
          value={cur}
          name="coinSelect"
          id="coinSelect"
          // Evento para cuando se selecciona una moneda, la pagina se recarga y se visualiza el cambio correcto
          onChange={(_) => {
            fun(document.getElementById("coinSelect").value);
          }}
        >
          {/* Recorre la lista con todas las monedas disponibles en el json que trajo por el consumo de la API y estas se logren visualizar en el menu desplegable */}
          {currencys.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
        {/* Boton para poder tener la capacidad de cambiar el tema o modo del dash, gracias al evento onClick */}
        <button className="toogleMode" onClick={toggleTheme}>
          {theme.img}
        </button>
      </div>
    </header>
  );
}
