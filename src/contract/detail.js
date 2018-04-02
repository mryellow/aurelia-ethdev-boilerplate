import { inject } from 'aurelia-framework';
import { DataService } from '../resources/services/data';
import { EthService } from '../resources/services/eth';
import { FlashService } from '../resources/services/flash';
import { SpinService } from '../resources/services/spin';

@inject(FlashService, SpinService, DataService, EthService)
export class ContractDetail {
  constructor(flashService, spinService, dataService, ethService, input) {
    this.name = input && input.name ? input.name : '';
    this.symbol = input && input.symbol ? input.symbol : '';
    this.shop = input && input.shop ? input.shop : '';
    this.object = input && input.object ? input.object : '';
    this.totalSupply = input && input.totalSupply ? input.totalSupply : '';

    this._flashService = flashService;
    this._spinService = spinService;
    this._dataService = dataService;
    this._ethService = ethService;
  }

  async updateContractERC20() {
    this._spinService.on();
    try {
      const contract = this._ethService.getContract('erc20', this.object);
      this.totalSupply = await contract.methods.totalSupply().call();
    } catch (err) {
      this._flashService.addFlash('error', 'Ethereum lookup failed');
      console.error('Ethereum lookup failed');
    }
    this._spinService.off();
  }

  async activate(model, route) {
    let contract = await this._dataService.getContractBySymbol(model.symbol);
    this.name = contract.name;
    this.symbol = contract.symbol;
    this.shop = contract.shop;
    this.object = contract.object;
    this.updateContractERC20(); // Don't wait for this before activating
  }
}
