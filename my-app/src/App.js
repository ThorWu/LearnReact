import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [state, setState] = useState({
    data: [],
  });

  //TODO:
  const [count, setCount] = useState({
    todoCount: 0,
    todoCompleteCount: 0,
  });

  useEffect(() => {
    console.log("state changed!" + JSON.stringify(state));

    let todoCount = state.data.length;
    let todoCompleteList = state.data.filter((item) => item.complete == true);
    let todoCompleteCount = todoCompleteList.length;

    setCount({
      todoCount: todoCount,
      todoCompleteCount: todoCompleteCount,
    });
  }, [state]);

  function handleNewTodoKeyDown(event) {
    if (event.keyCode !== 13) {
      return;
    }
    console.log(event);
    let list = state.data;
    list.push({
      task: event.target.value,
      complete: false,
    });
    setState({
      data: list,
    });
  }

  function handleDeleteTask(task) {
    console.log("deleteTask" + task + typeof task);
    let list = state.data.filter((item) => item.task != task);
    setState({
      data: list,
    });
  }

  function handleCheckTask(task) {
    console.log("checkTask" + task + typeof task);
    let list = state.data;
    list.forEach((item) => {
      if (item.task == task) {
        item.complete = item.complete == true ? false : true;
      }
    });

    setState({
      data: list,
    });
  }

  function TodoItem(props) {
    let task = props.task;
    let complete = props.complete;

    if (complete) {
      task = <s>{task}</s>;
    }

    function deleteTask() {
      props.deleteTask(props.task);
    }

    function checkTask() {
      props.checkTask(props.task);
    }

    return (
      <li>
        <input type="checkbox" checked={complete} onChange={checkTask} />
        {task}
        <button onClick={deleteTask}>删除</button>
      </li>
    );
  }

  function TodoFooter(props) {
    return (
      <li>
        {props.todoCompleteCount}已完成/
        {props.todoCount - props.todoCompleteCount}未完成/{props.todoCount}总数
      </li>
    );
  }

  function TodoList(props) {
    let taskList = props.data.map((item) => {
      return (
        <TodoItem
          task={item.task}
          complete={item.complete}
          checkTask={props.checkTask}
          deleteTask={props.deleteTask}
        />
      );
    });

    return (
      <ul>
        {taskList}
        <TodoFooter
          todoCompleteCount={props.todoCompleteCount}
          todoCount={props.todoCount}
        />
      </ul>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={handleNewTodoKeyDown}
          value={state.editValue}
        />
        <TodoList
          data={state.data}
          deleteTask={handleDeleteTask}
          checkTask={handleCheckTask}
          todoCompleteCount={count.todoCompleteCount}
          todoCount={count.todoCount}
        />
      </header>
    </div>
  );
}

export default App;
