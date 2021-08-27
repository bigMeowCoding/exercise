export class LazyMan {
  private readonly name: string;
  private callbacks: any[] = [];
  private timer: any;
  constructor(name: string) {
    this.name = name;
    this.hello();
  }
  private async hello() {
    this.callbacks.push(() => {
      console.log(`hi this is ${this.name}`);
    });
    this.clear();
    return this;
  }
  public sleep(time: number) {
    this.callbacks.push(this._sleep.bind(this, time));
    this.clear();
    return this;
  }
  public sleepFirst(time: number) {
    this.callbacks.unshift(this._sleep.bind(this, time));
    this.clear();
    return this;
  }
  private _sleep(timer: number) {
    console.log(`wait ${timer}=======`);
    return new Promise((res) => {
      setTimeout(() => {
        res();
      }, timer);
    });
  }
  public eat(food: string) {
    this.callbacks.push(this._eat.bind(this, food));
    this.clear();
    return this;
  }
  private async clear() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(async () => {
      for (let i = 0; i < this.callbacks.length; i++) {
        await this.callbacks[i]();
      }
    });
  }
  private async _eat(food: string) {
    console.log(`eat ${food}`);
  }
}
