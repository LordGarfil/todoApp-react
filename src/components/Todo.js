import React, { useState } from "react";
import { todoPriority_style } from "../controller/todo";

export function TodoForm(props) {
  let localData = JSON.parse(localStorage.getItem("tasks"));
  let loCalDataLength = localData ? localData.length : 0;

  const [taskData, setTaskData] = useState();
  const [tasksCount, setTasksCount] = useState(loCalDataLength);

  const updateTaskData = (e) => {
    setTaskData(e.target.parentElement);
  };

  const formValue = () => {
    let data = new FormData(taskData);
    data = data.entries();
    let retrieved = {};
    let obj = data.next();
    while (undefined !== obj.value) {
      retrieved[obj.value[0]] = obj.value[1];
      obj = data.next();
    }
    retrieved["id"] = tasksCount + 1;
    retrieved["completed"] = JSON.parse(retrieved["completed"].toLowerCase());
    taskData.reset();
    return retrieved;
  };

  const createNewTask = (e) => {
    e.preventDefault();
    const forDataValue = formValue();

    updateStoragedTasks(forDataValue);
    setTasksCount(JSON.parse(localStorage.getItem("tasks")).length);
    props.callback(forDataValue);
  };

  return (
    <div className="TodoForm">
      <form
        id="todoForm"
        onFocus={(e) => updateTaskData(e)}
        onSubmit={(e) => createNewTask(e)}
      >
        <input
          type="text"
          placeholder="Title"
          className="form-control"
          name="title"
        ></input>
        <input
          type="text"
          placeholder="Responsible"
          className="form-control"
          name="responsible"
        ></input>
        <input
          type="text"
          placeholder="Description"
          className="form-control"
          name="description"
        ></input>
        <select className="form-control" name="priority">
          <option value={null}>Priority</option>
          <option value={"low"}>Low</option>
          <option value={"medium"}>Medium</option>
          <option value={"high"}>High</option>
        </select>
        <select className="form-control" name="completed">
          <option label="Completed">null</option>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export function TodoCard(task) {
  const status = task.completed ? "Completed" : "Uncompleted";
  return (
    <div className="todo-card card" key={task.id}>
      <div className="card-header">
        <h2>{task.title}</h2>
        <span
          className={`badge badge-pill ${todoPriority_style(task.priority)}`}
        >
          {task.priority.toUpperCase()}
        </span>
      </div>
      <div className="card-body">
        <p>{task.description}</p>
        <div>
          <strong>By: </strong>
          <span>{task.responsible}</span>
        </div>
      </div>
      <div className="card-footer">
        <div style={flexRow_style}>
          <label htmlFor={`todoCheck${task.id}`}>{status}</label>
          <input
            type="checkbox"
            id={`todoCheck${task.id}`}
            onChange={() => task.toogleStatus(task)}
            checked={task.completed}
          />
        </div>
        <div style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
          <span className="material-icons edit mr-3">edit</span>
          <span className="material-icons delete" onClick={() => task.deleteTask(task)}>delete</span>
        </div>
      </div>
    </div>
  );
}

const flexRow_style = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const storageTaskItems = (taskItems) => {
  localStorage.setItem("tasks", JSON.stringify(taskItems));
};

export const updateStoragedTasks = (newElement) => {
  const localData = JSON.parse(localStorage.getItem("tasks"));
  if (localData) {
    localStorage.setItem("tasks", JSON.stringify([...localData, newElement]));
  } else {
    localStorage.setItem("tasks", JSON.stringify([newElement]));
  }
};
