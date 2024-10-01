const axios = require('axios');

class ParMonedas {
  constructor(referencia, target) {
    this.referencia = referencia;
    this.target = target;
  }
}

class RecopiladorDeDatos extends ParMonedas {
  async cotizacion() {
    const url = `https://api.coinbase.com/v2/exchange-rates?currency=${this.referencia}`;
    try {
      const response = await axios.get(url);
      const valor = response.data.data.rates[this.target];
      return { referencia: this.referencia, target: this.target, valor };
    } catch (error) {
      console.error(`Error al obtener la cotización para ${this.referencia} a ${this.target}:`, error.message);
      return null;
    }
  }
}

class ImpresoraDeDatos extends ParMonedas {
  imprimirCotizacion(cotizacion) {
    if (cotizacion) {
      console.log(`${cotizacion.referencia} a ${cotizacion.target}: ${cotizacion.valor}`);
    }
  }
}

class Orquestador extends ParMonedas {
  constructor(referencia, target) {
    super(referencia, target);
    this.recopilador = new RecopiladorDeDatos(referencia, target);
    this.impresora = new ImpresoraDeDatos(referencia, target);
  }

  async orquestar() {
    while (true) {
      const cotizacion = await this.recopilador.cotizacion();
      this.impresora.imprimirCotizacion(cotizacion);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

// Procedimiento principal
function iniciarCotizaciones() {
  const pares = [
    new Orquestador('BTC', 'EUR'),
    new Orquestador('BTC', 'USD'),
    new Orquestador('ETH', 'EUR'),
    new Orquestador('ETH', 'USD'),
    new Orquestador('USD', 'EUR'),
    new Orquestador('EUR', 'USD'),
  ];

  pares.forEach(par => par.orquestar());
}

iniciarCotizaciones();