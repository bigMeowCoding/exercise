"use strict";

class FlyweightFactory {
  private flyweights: any = {};
  constructor() {
    this.flyweights = {};
  }

  GetFlyweight(key: string) {
    if (this.flyweights[key]) {
      return this.flyweights[key];
    } else {
      this.flyweights[key] = new ConcreteFlyweight(key);
      return this.flyweights[key];
    }
  }

  CreateGibberish(keys: string[]) {
    return new UnsharedConcreteFlyweight(keys, this);
  }
}

class Flyweight {
  constructor() {}

  Operation(extrinsicState: number) {}
}

class ConcreteFlyweight extends Flyweight {
  private intrinsicState: string;
  constructor(key: string) {
    super();
    this.intrinsicState = key;
  }

  Operation(extrinsicState: number) {
    return extrinsicState + this.intrinsicState;
  }
}

class UnsharedConcreteFlyweight extends Flyweight {
  private flyweights: FlyweightFactory;
  private keys: string[];
  constructor(keys: string[], flyweights: FlyweightFactory) {
    super();
    this.flyweights = flyweights;
    this.keys = keys;
  }

  Operation(extrinsicState: number) {
    var key,
      word = "";

    for (var i = 0; i < extrinsicState; i++) {
      //random key
      key = this.keys[Math.floor(Math.random() * this.keys.length)];
      word = this.flyweights.GetFlyweight(key).Operation(word);
    }
    console.log("key====", key);
    console.log("word-----", word);
  }
}

export function init_Flyweight() {
  var flyweights = new FlyweightFactory();
  var gibberish = flyweights.CreateGibberish(["-", "+", "*"]);
  gibberish.Operation(5);
  gibberish.Operation(10);
}
