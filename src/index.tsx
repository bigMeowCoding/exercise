import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// console.log(isEqual())
// console.log(isEmpty())
// console.log(cloneDeep())
// console.log(identity())
// console.log(pickBy())
// console.log(isNumber())
// console.log(i
// sEmpty())


const rootElement = document.getElementById("root");
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}