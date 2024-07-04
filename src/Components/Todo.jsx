import React, { useState, useRef, useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { GrCheckboxSelected } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid";
const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);  
  const inputRef = useRef(null);
  const [editId, setEditId] = useState(null);



  //  whenever any state update this function will execute and focus on the input field
  useEffect(() => {
    inputRef.current.focus();
  });

  //get the Date from the input field
  const inputHandler = (event) => {
    setTodo(event.target.value);
  };

  // this is used for avoid refreshing while submitting the form
  const submitHandler = (event) => event.preventDefault();

  // adding new Todo
  const addTodo = (event) => {
    event.preventDefault();
    if (todo !== "") {
      setTodos([{ id: uuidv4(), text: todo, isComplete: false }, ...todos]);
      console.log(...todos);
      setTodo("");
    }
    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId);
      const updateTodo = todos.map((task) =>
        task.id === editTodo.id
          ? (task = { id: task.id, text: todo })
          : (task = { id: task.id, text: task.text })
      );

      setEditId(null);
      setTodo("");
      setTodos(updateTodo);
    }
  };

  //Delete Todo
  const onDelete = (todoId) => {
    console.log("entered delete fucn");
    const filteredTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(filteredTodos);
  };

  // this Function is to indentify that the todo is completed
  const onComplete = (todoId) => {
    let completedTask = todos.map((task) => {
      if (task.id === todoId) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });
    setTodos(completedTask);
  };

  //Edit  todo
  const onEdit = (todoId) => {
    todos.find((todo) => {
      if (todo.id == todoId) {
        setTodo(todo.text);
        setEditId(todo.id);
      }
    });
  };

  return (
    <div className="">
      <h1>What's Your Plan For Today</h1>
      <form className="todo-form" onSubmit={submitHandler}>
        <input
          className="todo-input"
          type="text"
          placeholder="Enter Your Tasks..."
          value={todo}
          onChange={inputHandler}
          ref={inputRef}
        />
        <button onClick={addTodo} className="todo-button">
          {editId ? "Edit" : "Add"}
        </button>
      </form>

      {todos.map((todo) => (
        <div key={todo.id} className="todo-container">
          <div className="todo-row" id={todo.isComplete ? "complete" : ""}>
            <div className="todo-text">{todo.text}</div>
            <div className="icons">
              <GrCheckboxSelected
                className="complete-icon"
                onClick={() => onComplete(todo.id)}
              />
              <RiCloseCircleLine
                onClick={() => onDelete(todo.id)}
                title="Delete"
                className="delete-icon"
              />
              <TiEdit
                className="edit-icon"
                title="Edit"
                onClick={() => onEdit(todo.id)}
              />
            </div>
          </div>
        </div>
      ))}
     
    </div>
  );
};

export default Todo;
