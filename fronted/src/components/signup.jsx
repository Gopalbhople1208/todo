import {Link,useNavigate} from 'react-router-dom';
import '../style/AddTask.css';
import {useState} from 'react';
function Signup(){
    
        const [userData,setTaskData] = useState({ });

        const navigate = useNavigate();

const handSignUp = async () => {

  console.log("user data sending.....",userData);

  let response = await fetch('http://localhost:3232/signup',{
      method:"POST",
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify(userData)
  });

  let result = await response.json();

  if(response.status === 201 && result.token){
      document.cookie = "token=" + result.token + "; path=/";
      console.log("response send", result);

      alert("Signup successful");
      navigate("/login");
  }else{
      alert("Signup failed");
  }
}

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
            onClick={handSignUp}
           className="link" type="submit">Sign Up</button>
            <br></br>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Signup;