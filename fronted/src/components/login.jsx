import {Link} from 'react-router-dom';
import '../style/AddTask.css';

function Login(){

    return(
        <div className="container">
            <h1>User Login</h1>
            <label>User Email</label>
           
            <input type="text" placeholder="Enter Email"></input>
            <br></br>
            <label>User Password</label>
           
            <input type="text" placeholder="Enter Password"></input>
            <br></br>
            <button type="submit">Login</button>
           
           <Link to="/signup" >Sign Up</Link>
        </div>
    )

}

export default Login;