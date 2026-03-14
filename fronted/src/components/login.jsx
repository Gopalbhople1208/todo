import {Link,useNavigate} from 'react-router-dom';
import '../style/AddTask.css';
import { useState,useEffect } from "react";

function Login(){

    const [userData,setTaskData] = useState({email:"",password:""});

    const navigate = useNavigate();



useEffect(()=>{
    if(localStorage.getItem('login')){
        navigate('/')
    }
})
const handLogin = async () => {

  console.log("user data sending.....",userData);

  let response = await fetch('http://localhost:3232/login',{
      method:"POST",
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify(userData)
  });

  let result = await response.json();

  if(result.success){
      document.cookie = "token=" + result.token + "; path=/";
      localStorage.setItem('login',userData.email)
   //   console.log("response send", result);


   window.dispatchEvent(new Event('localStorage-change'))
      alert("Login successful");
        navigate("/");



  }else{
      alert("Login failed");
  }
}



    return(
        <div className="container">
            <h1>User Login</h1>
            <label>User Email</label>
           
            <input onChange={(event)=>setTaskData({...userData,email:event.target.value})}  type="text" placeholder="Enter Email"></input>
            <br></br>
            <label>User Password</label>
        
            <input
             onChange={(event)=>setTaskData({...userData,password:event.target.value})}
            type="password" placeholder="Enter Password"></input>
            <br></br>
            <button 
             onClick={handLogin}
            type="submit">Login</button>
           
           <Link className="link" to="/signup" >Sign Up</Link>
        </div>
    )

}

export default Login;