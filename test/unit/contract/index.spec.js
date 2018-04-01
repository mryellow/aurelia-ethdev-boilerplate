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

    it(
      'it has a _pagePer',
      mochaAsync(async () => {
        const res = await viewModel._pagePer;
        expect(res).toBe(10);
      })
    );

    it(
      'it has a _pageNum',
      mochaAsync(async () => {
        const res = await viewModel._pageNum;
        expect(res).toBe(0);
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

  describe('_pageResults', () => {
    it(
      'should be equal to _pagePer',
      mochaAsync(async () => {
        await viewModel.activate();
        const res = await viewModel._pageResults;
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBe(10);
      })
    );
  });

  describe('_pageCount', () => {
    it(
      'should be rounded up',
      mochaAsync(async () => {
        await viewModel.activate();
        const res = await viewModel._pageCount;
        expect(res).toBe(2);
      })
    );
  });

  describe('goPage', () => {
    it(
      'should update _pageNum',
      mochaAsync(async () => {
        await viewModel.activate();
        await viewModel.goPage(1);
        const res = await viewModel._pageNum;
        expect(res).toBe(1);
      })
    );

    it(
      'should update _pageResults',
      mochaAsync(async () => {
        await viewModel.activate();
        await viewModel.goPage(1);
        const res = await viewModel._pageResults;
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBe(6);
      })
    );
  });
});
