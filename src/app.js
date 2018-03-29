import { PLATFORM } from 'aurelia-pal';

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';
    config.map([
      {
        route: ['', 'home'],
        name: 'home',
        moduleId: PLATFORM.moduleName('home/index')
      },
      {
        route: 'contract',
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
