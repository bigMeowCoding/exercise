import * as React from "react";
import "./index.scss";
import { useEffect, useRef } from "react";
import BetterScroll from "better-scroll";
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
    <div className={"wrapper"} id="el">
      <div className={"content"}>
        {makeList().map((item, index) => {
          return <li>{index}</li>;
        })}
      </div>
    </div>
  );
};
export default App;
