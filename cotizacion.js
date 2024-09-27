const axios = require("axios");

async function cotizacion(moneda, base) {
  const url = `https://api.coinbase.com/v2/exchange-rates?currency=${moneda}`;

  try {
    const response = await axios.get(url);
    const valor = response.data.data.rates[base];
    console.log(`${moneda}: ${valor}`);
  } catch (error) {
    console.error(
      `Error al obtener la cotización para ${moneda} a ${base}:`,
      error.message
    );
  }
}

function startCotizaciones() {
  cotizacion("BTC", "EUR");
  cotizacion("BTC", "USD");
  cotizacion("ETH", "EUR");
  cotizacion("ETH", "USD");
  cotizacion("USD", "EUR");
  cotizacion("EUR", "USD");
}

// Ejecutar cada 5 segundos
setInterval(startCotizaciones, 5000);

//Crear una primera clase "ParMonedas"

class ParMonedas {
  constructor(referencia, target) {
    this.referencia = referencia;
    this.target = target;
  }
}


const primerPar = new ParMonedas("EUR", "USD");

primerPar.target;
primerPar.referencia;

console.log (primerPar)