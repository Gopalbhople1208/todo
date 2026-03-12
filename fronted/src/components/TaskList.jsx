import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function TaskList() {

  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    let list = await fetch("http://localhost:3232/");
    list = await list.json();

    console.log(list);
    if(list.success){
 setTaskData(list.data);
    }
   
  };




   const deleteTask = async (id) => {
    try{
    let item = await fetch(`http://localhost:3232/deleteTask/${id}`, { method: "DELETE" });
    item = await item.json();

   
    if(item.success){
         console.log(item);
         getListData();

    }else{
        alert(item.message);
    }
     } catch (err) {
    console.error("Delete failed:", err);
    alert("Delete failed, see console for details.");
  }
   
  };





  



  

 

       
    return(
    <div >
        <h1>To Do List</h1>
        <table border="1" cellPadding="5" >     
              <thead style={{ backgroundColor: "#ea457c" }}>
            <tr>
                 
                <th>Sr.No</th>
                 <th>Title</th>
                  <th>Description</th>
                    <th>Delete</th>
                    <th>Update</th>
                  
            
            </tr>
        </thead>
         <tbody >
          {taskData && taskData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
  <button
    onClick={() => deleteTask(item._id)}
    className="delete-task"
    style={{
      backgroundColor: "#ff4d4f",
      color: "white",
      margin: "5px",
      padding: "6px 12px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
       
    }}
  >
    Delete
  </button>
 </td>
 <td>
  <Link
    to={`/update/${item._id}`}  // navigate to UpdateTask page
    style={{
      backgroundColor: "#35b559",
      color: "white",
      margin: "5px",
      padding: "6px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }}
  >
    Update
  </Link>
</td>
            </tr>
          ))}
        </tbody>
        </table>
      
      
    </div>
)}

export default TaskList;