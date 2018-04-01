import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { ContractIndex } from '../../../src/contract/index';
import { Container } from 'aurelia-dependency-injection';
import { DataService } from '../../../src/resources/services/data';

import mochaAsync from '../../async-wrapper';

describe('ContractIndex', () => {
  let component;
  let container;
  let viewModel;
  let dataService;

  beforeEach(() => {
    container = new Container();
    dataService = container.get(DataService);
    viewModel = container.get(ContractIndex);
    component = StageComponent.withResources()
      .inView('<router-view></router-view>')
      .boundTo(viewModel);
  });

  /*
  afterEach(() => {
    viewModel.dispose();
  });
  */

  describe('properties', () => {
    it(
      'it has a contracts',
      mochaAsync(async () => {
        const res = await viewModel.contracts;
        expect(Array.isArray(res)).toBe(true);
      })
    );
  });

  describe('activate', () => {
    it(
      'should load contracts',
      mochaAsync(async () => {
        await viewModel.activate();
        const res = await viewModel.contracts;
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBe(16);
        // expect(res).toBe([]);
      })
    );
  });
});
