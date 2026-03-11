import {Link} from "react-router-dom"
import '../style/NavBar.css' 

function NavBar(){
    return(
        <nav>
           
            <div className = "navbar">To do APP</div>
            <ul>
                 <li><Link to="/">List</Link></li>
                <li><Link to="/add">Add Task</Link></li>
               
            </ul>
        </nav>
    )

}
export default NavBar;