import { PLATFORM } from 'aurelia-pal';
import { inject } from 'aurelia-framework';
import { FlashService } from './resources/services/flash';
import { SpinService } from './resources/services/spin';

@inject(FlashService, SpinService)
export class App {
  constructor(flashService, spinService) {
    this._flashService = flashService;
    this._spinService = spinService;
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia dApp Boilerplate';
    config.map([
      {
        route: ['', 'contract'],
        name: 'contract',
        moduleId: PLATFORM.moduleName('contract/index'),
        nav: true,
        title: 'Contracts'
      },
      {
        route: 'contract/:id',
        name: 'contractDetail',
        moduleId: PLATFORM.moduleName('contract/detail')
      }
    ]);
  }
}
