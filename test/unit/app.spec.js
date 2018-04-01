import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { App } from '../../src/app';
import { Container } from 'aurelia-dependency-injection';
import { FlashService } from '../../src/resources/services/flash';
import { SpinService } from '../../src/resources/services/spin';

// import mochaAsync from '../../async-wrapper';

describe('App', () => {
  let component;
  let container;
  let viewModel;
  let flashService;
  let spinService;

  beforeEach(() => {
    container = new Container();
    flashService = container.get(FlashService);
    spinService = container.get(SpinService);
    viewModel = container.get(App);
    component = StageComponent.withResources()
      .inView('<router-view></router-view>')
      .boundTo(viewModel);
  });

  it('has no message', () => {
    expect(typeof viewModel.message).toBe('undefined');
  });
});
