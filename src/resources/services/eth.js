import Web3 from 'web3';

export class EthService {
  constructor() {
    console.log('EthService');

    if (typeof window.web3 !== 'undefined') {
      console.log('Web3 using currentProvider');
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log('Web3 using HttpProvider');
      // set the provider you want from Web3.providers
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
    }

    if (typeof this.web3 === 'undefined') {
      console.log('Web3 Not Found');
      return;
    }

    console.log('Web3 Initalised');
  }
}
