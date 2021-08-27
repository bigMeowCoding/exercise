import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import { LazyMan } from "./lazy-man";

chai.use(sinonChai);

const assert = chai.assert;

describe("promise", () => {
  it("common", () => {
    const lm = new LazyMan("tom");
    lm.eat("西瓜");
    lm.eat("苹果");
  });
  it("sleep", async () => {
    const lm = new LazyMan("jack");
    lm.eat("西瓜").sleep(3000).sleepFirst(3000).eat("苹果");
  });
});
