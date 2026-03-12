import {Link} from 'react-router-dom';
import '../style/AddTask.css';
import {useState} from 'react';
function Signup(){
    
        const [userData,setTaskData] = useState();
    return(
        <div className="container">
            <h1>Sign Up</h1>
            <label>User Name</label>
            <input 
            onChange={(event)=>setTaskData({...userData,name:event.target.value})} 
            type="text" placeholder="Enter User Name"></input>
            <br></br>
            <label>Email</label>
            <input
             onChange={(event)=>setTaskData({...userData,email:event.target.value})}
            type="text" placeholder="Enter Email "></input>
            <br></br>
            <label>Password</label>
            <input 
             onChange={(event)=>setTaskData({...userData,password:event.target.value})}
            type="text" placeholder="Enter Password"></input>
            <br></br>
            <button 
            onClick={()=>console.log(userData)}
           type="submit">Sign Up</button>
            <br></br>
            <Link  className="link" to="/login">Login</Link>
        </div>
    )
}

export default Signup;