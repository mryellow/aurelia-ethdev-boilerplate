import { inject } from 'aurelia-framework';
import { EthService } from '../resources/services/eth';

@inject(EthService)
export class ContractDetail {
  constructor(ethService) {
    this._ethService = ethService;
  }
}
