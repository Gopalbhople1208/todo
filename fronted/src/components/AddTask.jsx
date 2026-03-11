import "../style/AddTask.css";

function AddTask() {
  return (
    <div className="container">
      <h1>Add New Task</h1>
      <form action="/" method="post">
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          placeholder="Enter The Title" 
          name="title"
          id="title"
        />
        <br />

        <label htmlFor="description">Description</label>
        <textarea 
        rows={4}
          name="description" 
          placeholder="Enter The Description"
          id="description"
        ></textarea>
        <br />

        <button className="submit">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;