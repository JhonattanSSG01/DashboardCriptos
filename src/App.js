// Principalmente se importa lo necesario que se vaya a utilizar en este componente principal. 
import { useEffect, useState } from 'react' // Los hooks que se usan para inicializar el estado a las variables(useState) y controlar ese estado cada vez que se renderiza un componente(useEffect). 
import "./App.css"; // Estilos css
// import { Line } from "react-chartjs-2"; // Libreria para dibujar las lineas en las graficas.
// import axios from 'axios'; // Libreria para consumir una API
// Los diversos componentes fundamentales.
import CardPrincipal from './CardPrincipal';
import TableCoins from './TableCoins'; // Componente que se encarga de visualizar las monedas en una tabla para mejor entendimiento.
import Card from './Card'
import Convert from './Convert'; // Componente que se encarga de convertir la moneda.
import Footer from './Footer'
import Header from './Header'
// Libreria para lograr cambiar de modo claro a oscuro.
import { ThemeProvider } from "./Context/ThemeProvider";

/// El export en funciones nombradas, se refiere a que se exporta la sentencia especifica que esta maneje.
export default function App() {
  /// Estados
  // Se declara constantes con nuevos estados iniciales por defecto.
  const [coins, setCoins] = useState() // Almacena todos los valores del array(la cantidad de monedas) que llegue en la variable.
  const [currency, setCurrency] = useState() // Almacena los nombres de la moneda(el simbolo de cada moneda).
  const [selCur, setSelCur] = useState("usd") // Almacena en la variable el valor que se define en que moneda se visualizara el cambio. Por defecto se le asigna USD(dolar)
  // Consumo de la API(Interfaz de programacion de aplicaiones)
  const getData = async () => {
    // Se crea una constante respuesta para almacenar la url de la API, la cual se hace la peticion con el metodo fetch, se trae las monedas requeridas
    // y se pasa a un formato json(Notacion del objeto de Java Scripts)
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selCur}&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C90d%2C1y`)
    const json = await response.json()
    // Pasa lo mismo en la anterior peticion, pro, esta cambia o trae los nombres de cada moneda y se pasan a un formato json
    const response_cur = await fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
    const cur = await response_cur.json()

    setCoins(json) // Se almacena la moneda que traiga el json a la variable que se le declaro
    setCurrency(cur) // Se almacena el nombre que traiga el json a la variable que se le declaro
  }
  // Cada vez que el componente app se renderiza, se realiza la consulta a la API, se asigna un segundo parametro que es una lista vacia, la cual, significa que no se llamara constantemente, despues de que se haya consultado una vez.
  useEffect(() => {
    getData();
  }, []);
  // En este caso cada vez que se renderiza el componente, se le asigna el valor de la seleccion de la moneda que se requiere visualizar y esta consulta la API con dicha informacion.
  useEffect(() => {
    getData();
  }, [selCur]);

  // Retorna 
  return (
    // El condicional ternario valida si llegaron datos a la variable coins o no, si no llegan datos, por defecto se muestra el anuncio cargando...
    // Pero si llegan datos a la variable, se renderiza todos los componentes propuestos y necesarios que compone la pagina.
    !coins ? "Cargandoooo..." : (
      <div className='App'>
        <ThemeProvider>
          {/* Se le asigna las propiedades que sean necesarias para la visualizacion en la parte del encabezado,
            Estas props son el simbolo de la moneda, el despliegue de las diferentes monedas que se pueden elegir y el valor de esa moneda. */}
          <Header currencys={currency} fun={setSelCur} cur={selCur} />
        </ThemeProvider>
        <main>
          {/* En este apartado se desarrolla un div el cual contiene las monedas restantes despues de la posicion(0) de la lista. */}
          <div className="cards_con">
            {/* El método map() crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos. */}

            {/* Se recorre todo el array coins con el metodo map el cual retorna o devuelve algo, en este caso devuelve la  tarjeta con los datos asignados en el metodo.
              Los datos que devuelve el metodo son: el id, el simbolo(abreviacion) de la moneda, la imagen, el valor y el procentaje de caida o subida. El segundo parametro 
              que se pone en el index o devuelve un error, ese index se valida en una condicion, si es diferente a la posicion 0(Esta posicion es la que se pinta inicialmente) retorne
              dicha tarjeta con los datos asignados*/}
            {coins.map(({ id, symbol, image, current_price, price_change_percentage_30d_in_currency }, index) => {
              if (index != 0) {
                /* Las keys ayudan a React a identificar que ítems han cambiado, son agregados, o son eliminados. Esas keys deben ser dadas a los elementos dentro del array para darle 
                 a los elementos una identidad estable. La mejor forma de elegir una key es usando un string que identifique únicamente a un elemento de la lista entre sus hermanos.
                 Habitualmente vas a usar IDs de tus datos como key:Cuando no tengas IDs estables para renderizar, puedes usar el índice del ítem como una key como último recurso.*/
                return <Card key={index} price={`${symbol} - ${current_price} ${selCur} `} porcentaje={deleteDec(price_change_percentage_30d_in_currency, 2)} img={image} coinId={id} cur={selCur} />
              }
            })
            }
          </div>
          {/* En el main se viualiza el contenido de las tarjetas principales con sus datos respectivos, la primera moneda que se visualiza es la 
            primera pocision de la lista(0) la cual se almaceno anteriormente y esta no se visualiza en la tabla de las monedas restantes. */}
          <CardPrincipal json={coins[0]} cur={selCur} />
        </main>
        <Convert />{/*  Trae toda la logia del componente convert y se pinta */}
        <TableCoins coins={coins} />{/* Se le pasa las props que es la lista de la monedas que existen */}
        <Footer />
      </div>
    )
  )

}
// Esta funcion nos ayuda a formatear el numero que llegue y este se puede dejar con N cantidades de decimales.
export function deleteDec(val, decimal) {
  return val.toFixed(decimal)
}
// Esta funcion nos ayuda a dar color al descuento depende de la validacion propuesta.
export function colorDec(num) {
  return num > 0 ? "green" : "red"
}
export const numberF = Intl.NumberFormat("es-ES") // Formato para el precio.
