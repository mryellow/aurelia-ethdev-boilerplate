import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { ContractDetail } from '../../../src/contract/detail';
import { Container } from 'aurelia-dependency-injection';
import { DataService } from '../../../src/resources/services/data';
import { EthService } from '../../../src/resources/services/eth';

import mochaAsync from '../../async-wrapper';

process.on('unhandledRejection', (reason, promise) => {
  console.log('Node', 'Unhandled rejection promise', reason, promise);
  //throw up;
});

/*
process.on('unhandledRejection', error => {
  console.error(error.stack);
});
*/

window.addEventListener('unhandledrejection', function(event) {
  console.log(
    'Browser',
    'Unhandled rejection promise: ',
    event.promise,
    ', reason: ',
    event.reason
  );
});

describe('ContractDetail', () => {
  let component;
  let container;
  let viewModel;
  let dataService;
  let ethService;

  beforeEach(() => {
    container = new Container();
    dataService = container.get(DataService);
    ethService = container.get(EthService);
    viewModel = container.get(ContractDetail);
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
    it('it has a name', () => {
      expect(viewModel).toHaveProperty('name', '');
    });

    it('it has a symbol', () => {
      expect(viewModel).toHaveProperty('symbol', '');
    });

    it('it has a shop', () => {
      expect(viewModel).toHaveProperty('shop', '');
    });

    it('it has a object', () => {
      expect(viewModel).toHaveProperty('object', '');
    });

    it('it has a totalSupply', () => {
      expect(viewModel).toHaveProperty('totalSupply', '');
    });

    it('it has a _dataService', () => {
      expect(viewModel).toHaveProperty('_dataService');
    });

    it('it has a _ethService', () => {
      expect(viewModel).toHaveProperty('_ethService');
    });
  });

  const dataMock = {
    name: 'Takemitsu',
    symbol: 'WEAP134',
    shop: '0x7b9c37ca42c48e131b81475b3520b81327538b7d',
    object: '0xd0c1f00e652046ad0b67290aaa28139c0e66a2ef'
  };

  describe('activate', () => {
    /*
    beforeEach(
      mochaAsync(async () => {

      })
    );
    */

    it(
      'should load contract details',
      mochaAsync(async () => {
        await viewModel.activate({
          symbol: dataMock.symbol
        });
        let res = await viewModel.name;
        expect(res).toBe(dataMock.name);
        res = await viewModel.symbol;
        expect(res).toBe(dataMock.symbol);
        res = await viewModel.shop;
        expect(res).toBe(dataMock.shop);
        res = await viewModel.object;
        expect(res).toBe(dataMock.object);
      })
    );
  });

  xdescribe('updateContractERC20', () => {
    it('should be a function', () => {
      viewModel.updateContractERC20.toBeInstanceOf(Function);
    });

    xit(
      'should retrieve totalSupply from blockchain',
      mochaAsync(async () => {
        await viewModel.activate({
          symbol: dataMock.symbol
        });
        // FIXME: The contract needs to exist on local testnet
        // FIXME: Could it be done with 3rd party?
        viewModel.updateContractERC20();
        expect(viewModel.totalSupply).toBeGreaterThan(0);
      })
    );
  });
});
