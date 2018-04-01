import { computedFrom, inject } from 'aurelia-framework';
import { DataService } from '../resources/services/data';

@inject(DataService)
export class ContractIndex {
  constructor(dataService) {
    this.contracts = [];

    this._pagePer = 10;
    this._pageNum = 0;

    this._dataService = dataService;
  }

  @computedFrom('contracts', '_pagePer')
  get _pageCount() {
    return Math.floor(this.contracts.length / this._pagePer) + 1;
  }

  @computedFrom('contracts', '_pagePer', '_pageNum')
  get _pageResults() {
    let items = this.contracts;
    if (!items) return [];

    let compare = function compare(a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    };

    let begin = this._pageNum * this._pagePer;
    let finish = Math.min(items.length, begin + this._pagePer);
    return items.sort(compare).slice(begin, finish);
  }

  goPage(page = 0) {
    this._pageNum = page;
  }

  async activate(model, route) {
    console.log('activate', model, route);
    this.contracts = await this._dataService.getContracts();
  }
}
