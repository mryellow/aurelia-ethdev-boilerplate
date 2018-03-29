export class SpinService {
  constructor() {
    this.active = 0;
  }

  on() {
    this.active++;
  }

  off() {
    this.active--;
  }
}
