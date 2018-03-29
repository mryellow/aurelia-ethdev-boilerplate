export class DataService {
  constructor() {
    this.data = require('../../data/contracts.json').contracts;
    this.dataBySymbol = this.data.reduce((obj, val) => {
      obj[val.symbol] = val;
      return obj;
    }, {});
  }

  getContracts() {
    // Simulate async
    return new Promise(resolve => {
      setTimeout(() => resolve(this.data), 1000);
    });
  }

  getContractBySymbol(symbol) {
    // Simulate async
    return new Promise(resolve => {
      setTimeout(() => resolve(this.dataBySymbol[symbol]), 1000);
    });
  }
}
