import { useState, useEffect } from "react";

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
       
    return(
    <div >
        <h1>To Do List</h1>
        <table border="1" cellPadding="5" >     
              <thead style={{ backgroundColor: "#ea457c" }}>
            <tr>
                <th>Sr.No</th>
                 <th>Title</th>
                  <th>Description</th>
            </tr>
        </thead>
         <tbody style={{ backgroundColor: "#e845aa" }}>
          {taskData && taskData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
        </table>
      
      
    </div>
)}

export default TaskList;