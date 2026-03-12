import {Link} from 'react-router-dom';
import '../style/AddTask.css';

function Signup(){
    
    return(
        <div className="container">
            <h1>Sign Up</h1>
            <label>User Name</label>
            <input type="text" placeholder="Enter User Name"></input>
            <br></br>
            <label>Email</label>
            <input type="text" placeholder="Enter Email "></input>
            <br></br>
            <label>Password</label>
            <input type="text" placeholder="Enter Password"></input>
            <br></br>
            <button type="submit">Sign Up</button>
            <br></br>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Signup;