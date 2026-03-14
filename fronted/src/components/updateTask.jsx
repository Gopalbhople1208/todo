// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function UpdateTask() {
//   const [taskData, setTaskData] = useState({ title: "", description: "" });
//   const { id } = useParams(); // get task ID from URL
//   const navigate = useNavigate(); // redirect after update

//   useEffect(() => {
//     fetchTask();
//   }, []);

//   const fetchTask = async () => {
//     try {
//       const res = await fetch(`http://localhost:3232/task/${id}`);
//       const data = await res.json();
//       if (data.success) setTaskData(data.data); // pre-fill form
//     } catch (err) {
//       console.error("Fetch task failed:", err);
//     }
//   };

//   const updateTask = async () => {
//     try {
//       const res = await fetch(`http://localhost:3232/updateTask/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: taskData.title,
//           description: taskData.description
//         })
//       });

//       const result = await res.json();

//       if (result.success) {
//         alert("Task Updated Successfully");
//         navigate("/"); // redirect to TaskList page
//       } else {
//         alert(result.message);
//       }
//     } catch (err) {
//       console.error("Update failed:", err);
//       alert("Update failed, check console");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Update Task</h1>

//       <label>Title:</label>
//       <input
//         type="text"
//         value={taskData.title}
//         onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
//       />
//       <br /><br />

//       <label>Description:</label>
//       <textarea
//         value={taskData.description}
//         onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
//       />
//       <br /><br />

//       <button onClick={updateTask}>Update Task</button>
//     </div>
//   );
// }

// export default UpdateTask;









import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateTask() {
  const [taskData, setTaskData] = useState({ title: "", description: "" });
  const { id } = useParams(); // get task ID from URL
  const navigate = useNavigate(); // redirect after update

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const res = await fetch(`http://localhost:3232/task/${id}`);
      const data = await res.json();
      if (data.success) setTaskData(data.data); // pre-fill form
    } catch (err) {
      console.error("Fetch task failed:", err);
    }
  };

  const updateTask = async () => {
    try {
      const res = await fetch(`http://localhost:3232/updateTask/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: taskData.title,
          description: taskData.description
        })
      });

      const result = await res.json();

      if (result.success) {
        alert("Task Updated Successfully");
        navigate("/"); // redirect to TaskList page
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed, check console");
    }
  };

  return (
    <div className="container">
      <h1>Update Task</h1>

      <label>Title:</label>
      <input
        type="text"
        value={taskData.title}
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
      />
      <br /><br />

      <label>Description:</label>
      <textarea
        value={taskData.description}
        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
      />
      <br /><br />

      <button onClick={updateTask}>Update Task</button>
    </div>
  );
}

export default UpdateTask;