import { inject } from 'aurelia-framework';
import { EthService } from '../resources/services/eth';

@inject(EthService)
export class ContractIndex {
  constructor(ethService) {
    this._ethService = ethService;
  }
}
