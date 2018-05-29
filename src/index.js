import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import Dropbox from "./Dropbox";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <Hello name="Dropbox sample" />
    <Dropbox />
  </div>
);

render(<App />, document.getElementById("root"));
