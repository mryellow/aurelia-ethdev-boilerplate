export class FlashService {
  constructor() {
    this.flashes = [];
  }

  addFlash(status, message) {
    if (!status || !message) return;

    this.flashes.push({
      status: status.toLowerCase(),
      message: message
    });

    let _this = this;
    setTimeout(function() {
      _this.flashes.pop();
    }, 3000);
  }
}
