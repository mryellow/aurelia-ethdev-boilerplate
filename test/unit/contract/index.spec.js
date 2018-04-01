import mochaAsync from '../../async-wrapper';
import { ContractIndex } from '../../../src/contract/index';

describe('ContractIndex', () => {
  let metaMain;
  beforeEach(() => {
    metaMain = new ContractIndex();
  });

  describe('properties', () => {
    it(
      'it has a contracts',
      mochaAsync(async () => {
        const res = await metaMain.contracts;
        expect(Array.isArray(res)).toBe(true);
      })
    );
  });

  describe('activate', () => {
    it(
      'should load contracts',
      mochaAsync(async () => {
        await metaMain.activate();
        const res = await metaMain.contracts;
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBe(0);
        // expect(res).toBe([]);
      })
    );
  });
});
