import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";

function Home() {
  const initialArr = localStorage.getItem("task")
    ? JSON.parse(localStorage.getItem("task"))
    : [];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState(initialArr);

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const save = (event) => {
    event.preventDefault();
    setTask([...task, { title, description }]);
    console.log(task);
    setTitle("");
    setDescription("");
  };

  const deleteTask = (index) => {
    const filteredArr = task.filter((val, i) => {
      return i !== index;
    });
    setTask(filteredArr);
  };

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  return (
    <>
      <div className="container">
        <h1>MY DAILY GOALS</h1>
        <form onSubmit={save}>
          <input
            type="text"
            placeholder="Task Title"
            onChange={titleHandler}
            value={title}
          />
          <textarea
            placeholder="description.."
            onChange={descriptionHandler}
            value={description}
          ></textarea>
          <button type="submit">ADD</button>
        </form>
        {task.map((item, index) => (
          <Tasks
            key={index}
            title={item.title}
            description={item.description}
            deleteTask={deleteTask}
            index={index}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
