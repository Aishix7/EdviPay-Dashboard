import { useState } from "react";
import { Sample } from "./components/sample";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Sample />
    </>
  );
}

export default App;
