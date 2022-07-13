import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Todo = ({
  inputData,
  setInputData,
  todo,
  setTodo,
  editTodo,
  setEditTodo,
  toggleSubmit,
  setToggleSubmit,
  count,
  setCount,
}) => {
  const onComplete = (element) => {
    setTodo(
      todo.map((item) => {
        if (item.id === element.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );

    if (todo.completed === false) {
      if (count > 0) {
        setCount(count - 1);
      } else {
        setCount(0);
      }
      console.log("count", count);
    } else {
      setCount(count + 1);
      console.log("count", count);
    }
  };

  let errorMsg = document.getElementById("errorMsg");

  const updateTodo = (title, id, completed) => {
    const newTodo = todo.map((element) =>
      element.id === id ? { title, id, completed } : element
    );

    setTodo(newTodo);
    setEditTodo("");
  };

  useEffect(() => {
    if (editTodo) {
      setInputData(editTodo.title);
    } else {
      setInputData("");
    }
  }, [setInputData, editTodo]);

  const onAdd = (e) => {
    if (!inputData) {
      errorMsg.innerHTML = `Error: Sorry, blank values not allowed! <br>`;
      setTimeout(() => {
        errorMsg.style.display = "none";
      }, 2000);
      errorMsg.style.display = "block";
    } else {
      e.preventDefault();
      if (!editTodo) {
        setTodo([
          ...todo,
          { id: uuidv4(), title: inputData, completed: false },
        ]);
        setInputData("");
      } else {
        updateTodo(inputData, editTodo.id, editTodo.completed);
        setToggleSubmit(false);
        setInputData("");
      }
    }
  };

  const onDelete = ({ id }) => {
    setTodo(todo.filter((element) => element.id !== id));
  };

  const onUpdate = ({ id }) => {
    let newItem = setEditTodo(todo.find((element) => element.id === id));
    setToggleSubmit(true);
    setInputData(newItem);
    setInputData("");
  };

  const clearAll = () => {
    setTodo([]);
  };

  return (
    <>
      <div className="container-fluid bg-info">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Todo List</h4>
            <hr />
            <h5 className="card-subtitle my-3 text-muted">
              Total: {todo.length} | Completed: {count}
            </h5>

            <div className="addItem">
              <input
                className={`${
                  todo.completed ? "form-control completed" : "form-control"
                }`}
                type="text"
                placeholder="Add Todo"
                value={todo.title}
                onChange={(e) => setInputData(e.target.value)}
              />
              {toggleSubmit ? (
                <button
                  className="btn btn-dark"
                  title="Update Item"
                  onClick={onAdd}
                >
                  <i className="fa-solid fa-edit"></i>
                </button>
              ) : (
                <button
                  className="btn btn-dark"
                  title="Add Item"
                  onClick={onAdd}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              )}
            </div>

            <h5>Things to do:</h5>

            <div className="showItem">
              {todo.map((element) => {
                return (
                  <div className="eachItem" key={element.id}>
                    <div className="form-check">
                      <span
                        className="checkBtn"
                        id="checkBtn"
                        onClick={() => onComplete(element)}
                      >
                        <i
                          className={`${
                            todo.completed
                              ? "fa-solid fa-square-check"
                              : "fa-solid fa-square"
                          }`}
                        ></i>
                      </span>
                      <label
                        className="form-check-label paraCheck"
                        htmlFor="check"
                        id="para"
                      >
                        {element.title}
                      </label>
                    </div>
                    <span className="iconGroup">
                      <i
                        id="update"
                        className="fa-solid fa-pen-to-square"
                        title="Update Item"
                        onClick={() => onUpdate(element)}
                      ></i>
                      <span>|</span>
                      <i
                        id="delete"
                        className="fa-solid fa-trash-can"
                        title="Delete Item"
                        onClick={() => onDelete(element)}
                      ></i>
                    </span>
                  </div>
                );
              })}
            </div>

            <h6 className="text-danger">
              <p id="errorMsg"></p>
            </h6>

            <div className="btnGroup mt-3">
              <button className="btn btn-danger" onClick={clearAll}>
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
