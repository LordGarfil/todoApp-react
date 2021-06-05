import React, { useState, useEffect } from "react";
import "./App.css";
import TopNav from "./components/TopNav";
import { TodoForm, TodoCard, storageTaskItems } from "./components/Todo";
import todos from "./services/todos.json";

function App() {
  const [taskItems, setTaskItems] = useState(todos);

  useEffect(() => {
    let dataStoraged = JSON.parse(localStorage.getItem("tasks"));
    if (dataStoraged != null) {
      setTaskItems(dataStoraged);
    } else {
      setTaskItems(todos);
    }
  }, []);

  useEffect(() => {
    storageTaskItems(taskItems);
  }, [taskItems]);

  const toogleTaskStatus = (task) => {
    setTaskItems(
      taskItems.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const createNewTask = (task) => {
    if (!taskItems.find((t) => t.id === task.id)) {
      setTaskItems([...taskItems, task]);
    }
  };

  const deleteTask = (task) => {
    setTaskItems(
      taskItems.filter(t => t.id !== task.id)
    )
  }

  return (
    <div className="App">
      <TopNav tasks={taskItems} />
      <div className="content">
        <TodoForm callback={createNewTask}></TodoForm>
        <div className="todo-area">
          {taskItems.map((todo, index) => (
            <TodoCard {...todo} toogleStatus={toogleTaskStatus} deleteTask={deleteTask}></TodoCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
