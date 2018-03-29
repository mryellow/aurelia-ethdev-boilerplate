import { inject } from 'aurelia-framework';
import { DataService } from '../resources/services/data';
import { EthService } from '../resources/services/eth';

@inject(DataService, EthService)
export class ContractDetail {
  constructor(dataService, ethService, input) {
    this.name = input && input.name ? input.name : '';
    this.symbol = input && input.symbol ? input.symbol : '';
    this.shop = input && input.shop ? input.shop : '';
    this.object = input && input.object ? input.object : '';

    this._dataService = dataService;
    this._ethService = ethService;
  }

  async activate(model, route) {
    let contract = await this._dataService.getContractBySymbol(model.symbol);
    this.name = contract.name;
    this.symbol = contract.symbol;
    this.shop = contract.shop;
    this.object = contract.object;
  }
}
