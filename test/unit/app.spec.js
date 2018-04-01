import { App } from '../../src/app';

describe('the app', () => {
  it('should be undefined', () => {
    expect(typeof new App().message).toBe('undefined');
  });
});
