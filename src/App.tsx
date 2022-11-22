import * as React from "react";
import "./index.scss";
import { useEffect, useRef } from "react";
import BetterScroll from "better-scroll";
import classNames from "classnames";
const App = () => {
  const ref = useRef();
  function makeList() {
    return Array.from(new Array(50));
  }

  useEffect(() => {
    const el = document.getElementById("el");
    const b = new BetterScroll(el);
  }, []);
  return (
    <div className={classNames("wrapper")} id="el">
      <h1 className={"text-4xl"}>h1</h1>
      <div className={"bg-red-500"}>
        {makeList().map((item, index) => {
          return <li className={"m-1 text-xs"}>{index}</li>;
        })}
      </div>
    </div>
  );
};
export default App;
