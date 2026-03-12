import { useState } from "react";
import "../style/AddTask.css";

function AddTask() {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const handAddTask = async () => {
    if (!taskData.title || !taskData.description) {
      alert("Please fill in both fields!");
      return;
    }

    try {
      let result = await fetch("http://localhost:3232/add-task", {
        method: "POST",
        body: JSON.stringify(taskData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();

      if (result) {
        alert("Task added successfully!"); // <-- show alert
        console.log("Task added:", result);

        // Clear input fields (refresh form)
        setTaskData({ title: "", description: "" });
      }
    } catch (err) {
      console.error("Failed to add task:", err);
      alert("Failed to add task. Check console.");
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
        value={taskData.title} // bind value
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
        value={taskData.description} // bind value
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