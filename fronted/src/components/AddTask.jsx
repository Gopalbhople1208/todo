import { useState } from "react";
import "../style/AddTask.css";

function AddTask() {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    

  });

  const handAddTask = async () => {
    console.log(taskData);

    let result = await fetch("http://localhost:3232/add-task", {
      method: "POST",
      body: JSON.stringify(taskData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();

    if (result) {
      console.log("Add New Task");
    }
  };

  return (
    <div className="container">
      <h1>Add New Task</h1>

      <label htmlFor="title">Title</label>
      <input
        type="text"
        placeholder="Enter The Title"
        name="title"
        id="title"
        onChange={(event) =>
          setTaskData({ ...taskData, title: event.target.value })
        }
      />
      <br />

      <label htmlFor="description">Description</label>
      <textarea
        rows={4}
        name="description"
        placeholder="Enter The Description"
        id="description"
        onChange={(event) =>
          setTaskData({ ...taskData, description: event.target.value })
        }
      ></textarea>
      <br />

      <button onClick={handAddTask} className="submit">
        Add Task
      </button>
    </div>
  );
}

export default AddTask;