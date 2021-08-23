import * as React from "react";
import BScrollExample from "./b-scroll";
import { useEffect } from "react";

function fun() {
  console.log("window====keydown");
}

const App = () => {
  useEffect(() => {
    var myInput = document.getElementById("input");

    var codes = {
      48: 0,
      49: 1,
      50: 2,
      51: 3,
      52: 4,
      53: 5,
      54: 6,
      55: 7,
      56: 8,
      57: 9,
    };

    var keydownHelper = function (e) {
      console.log("e===", e);
      e.preventDefault();
      myInput.removeEventListener("input", inputHelper);

      var val = myInput.value;

      // Delete
      if (e.keyCode === 8 && val.length) {
        myInput.value = val.slice(0, val.length - 1);
        return;
      }

      // If not a number, do nada
      if (typeof codes[e.keyCode] === "undefined") {
        return;
      }

      val += codes[e.keyCode];
      myInput.value = val;
    };

    var inputHelper = function (e) {
      console.log("input========");
      e.preventDefault();
      window.removeEventListener("keydown", keydownHelper);
    };

    myInput.addEventListener("input", inputHelper);
    window.addEventListener("keydown", keydownHelper);
  }, []);

  return (
    <div>
      <input
        type="text"
        id={"input"}
        onChange={(v) => {
          console.log(v);
        }}
      />
    </div>
  );
};
export default App;
