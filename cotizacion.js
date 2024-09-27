const axios = require("axios");

async function cotizacion(moneda, base) {
  const url = `https://api.coinbase.com/v2/exchange-rates?currency=${moneda}`;

  try {
    const response = await axios.get(url);
    const valor = response.data.data.rates[base];
    console.log(`${moneda}: ${valor} ${base}`);
  } catch (error) {
    console.error(
      `Error al obtener la cotización para ${moneda} a ${base}:`,
      error.message
    );
  }
}

//Crear una primera clase "ParMonedas"

class ParMonedas {
  constructor(referencia, target) {
    this.referencia = referencia;
    this.target = target;
  }
}

paresDeMonedas = [new ParMonedas("EUR", "USD")];

function startCotizaciones() {
  paresDeMonedas.forEach((par) => {
    cotizacion(par.target, par.referencia);
  });
}

// Ejecutar cada 5 segundos
setInterval(startCotizaciones, 5000);
