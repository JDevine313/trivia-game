import { useState } from "react";
import "./App.css";
import CatagoryPicker from "./components/CatagoryPicker";
import Quiz from "./components/Quiz";

function App() {
  const [catagories, setCatagories] = useState<string[]>([]);
  return (
    <div className="App">
      <button id="new-game" onClick={() => setCatagories([])}>
        New Quiz
      </button>
      {catagories.length === 0 ? (
        <CatagoryPicker setCatagories={setCatagories} />
      ) : (
        <Quiz catagories={catagories} />
      )}
    </div>
  );
}

export default App;
