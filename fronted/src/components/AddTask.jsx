// import { useState } from "react";
//  import "../style/AddTask.css";

//  function AddTask() {
//    const [taskData, setTaskData] = useState({
//      title: "",
//      description: "",
//    });

//    const handAddTask = async () => {
//      if (!taskData.title || !taskData.description) {
//        alert("Please fill in both fields!");
//        return;
//      }

//      try {
//        let result = await fetch("http://localhost:3232/add-task", {
//          method: "POST",
//          body: JSON.stringify(taskData),
//          headers: {
//            "Content-Type": "application/json",
//          },
//        });

//        result = await result.json();

//        if (result) {
//          alert("Task added successfully!"); 
//          console.log("Task added:", result);

        
//          setTaskData({ title: "", description: "" });
//        }
//      } catch (err) {
//        console.error("Failed to add task:", err);
//        alert("Failed to add task. Check console.");
//      }
//   };





//      return (
//      <div className="container">
//        <h1>Add New Task</h1>

//        <label htmlFor="title">Title</label>
//        <input
//          type="text"
//          placeholder="Enter The Title"
//          name="title"
//          id="title"
//          value={taskData.title} // bind value
//          onChange={(event) =>
//            setTaskData({ ...taskData, title: event.target.value })
//          }
//        />
//        <br />

//        <label htmlFor="description">Description</label>
//        <textarea
//          rows={4}
//          name="description"
//          placeholder="Enter The Description"
//          id="description"
//          value={taskData.description} // bind value
//          onChange={(event) =>
//            setTaskData({ ...taskData, description: event.target.value })
//          }
//        ></textarea>
//        <br />

//        <button onClick={handAddTask} className="submit">
//          Add Task
//        </button>
//      </div>
//    );
// }

//  export default AddTask;





import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AddTask.css";

function AddTask() {
  const [taskData, setTaskData] = useState({ title: "", description: "" });
  const navigate = useNavigate(); // ← for redirection

  const handAddTask = async () => {
    if (!taskData.title || !taskData.description) {
      alert("Please fill in both fields!");
      return;
    }

    try {
      let result = await fetch("/api/add-task", {
        method: "POST",
        body: JSON.stringify(taskData),
        headers: { "Content-Type": "application/json" },
      });

      result = await result.json();

      if (result.success) {
        alert("Task added successfully!");
        setTaskData({ title: "", description: "" });

        // ✅ Redirect to TaskList page (assuming path is '/')
        navigate("/");
      } else {
        alert("Failed to add task: " + result.message);
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
        id="title"
        value={taskData.title}
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
      />
      <br />
      <label htmlFor="description">Description</label>
      <textarea
        rows={4}
        placeholder="Enter The Description"
        id="description"
        value={taskData.description}
        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
      ></textarea>
      <br />
      <button onClick={handAddTask} className="submit">
        Add Task
      </button>
    </div>
  );
}

export default AddTask;