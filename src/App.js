import React, { useState } from "react";
import Todo from "./components/Todo";
import "./App.css";

function App() {
  const [inputData, setInputData] = useState("");
  const [todo, setTodo] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <>
      <Todo
        inputData={inputData}
        setInputData={setInputData}
        todo={todo}
        setTodo={setTodo}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
        toggleSubmit={toggleSubmit}
        setToggleSubmit={setToggleSubmit}
        count={count}
        setCount={setCount}
        onChange={(e) => setInputData(e.target.value)}
      />
    </>
  );
}

export default App;
