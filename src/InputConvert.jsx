// Principalmente se importa lo necesario que se vaya a utilizar en este componente principal.
import React, { useState, useRef } from "react"; // Se importa los estados de las variables
import "./Convert.css"; // Estilos Css
import { deleteDec } from "./App"; // Se importa una funciin en especifico para el tema de formato de decimales.

/// El export en funciones nombradas, se refiere a que se exporta la sentencia especifica que esta maneje.
export default function InputConvert({
  coin,
  sel = "btc",
  fun,
  other,
  text,
  type = 1,
  result = 0,
}) {
  const selRef = useRef(null);
  const [selVal, setSelVal] = useState(sel);
  // Retrona una estructura HTML para poder ingresar los valores que queremos convertir.
  return (
    <>
      <div className="input">
        {type === 0 ? (
          <input
            type="number"
            placeholder="0"
            onChange={(e) => {
              text(parseFloat(e.target.value));
            }}
          />
        ) : (
          <input
            type="number"
            placeholder="0"
            value={deleteDec(result, 4)}
            readOnly={true}
          />
        )}

        <div className="select">
          <img src="" alt="" />
          <select
            value={selVal}
            ref={selRef}
            onChange={() => {
              setSelVal(selRef.current.value);
              fun(selRef.current.value);
            }}
          >
            {coin.map((co) => {
              if (co.symbol === selVal) {
                selRef.current.previousSibling.src = co.image;
                return (
                  <option value={co.symbol} key={co.id}>
                    {co.symbol}
                  </option>
                );
              } else if (co.symbol != other) {
                return (
                  <option value={co.symbol} key={co.id}>
                    {co.name}
                  </option>
                );
              }
            })}
          </select>
        </div>
      </div>
    </>
  );
}
