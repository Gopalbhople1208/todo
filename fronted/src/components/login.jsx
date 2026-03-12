import {Link} from 'react-router-dom';
import '../style/AddTask.css';
import { useState } from "react";

function Login(){

    const [userData,setTaskData] = useState();

    return(
        <div className="container">
            <h1>User Login</h1>
            <label>User Email</label>
           
            <input onChange={(event)=>setTaskData({...userData,email:event.target.value})}  type="text" placeholder="Enter Email"></input>
            <br></br>
            <label>User Password</label>
        
            <input
             onChange={(event)=>setTaskData({...userData,password:event.target.value})}
            type="text" placeholder="Enter Password"></input>
            <br></br>
            <button 
             onClick={()=>console.log(userData)}
            type="submit">Login</button>
           
           <Link className="link" to="/signup" >Sign Up</Link>
        </div>
    )

}

export default Login;