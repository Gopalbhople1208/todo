import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import '../style/NavBar.css';

function NavBar(){

    const navigate = useNavigate();
    const [login,setLogin] = useState(localStorage.getItem('login'));

    const logout = () => {
        localStorage.removeItem('login');
        setLogin(null);
            setTimeout(()=>{
        navigate("/login");

            },0)
    }
useEffect(()=>{
const handleStorage=()=>{
    setLogin(localStorage.getItem('login'))
}

window.addEventListener("localStorage-change",handleStorage )

return ()=>{
    window.removeEventListener("localStorage-change",handleStorage)
}
},[])



    return(
        <nav className="navbar">
            <div className="logo">To do APP</div>

            <ul className="nav-links">

                {login ? (
                    <>
                        <li><Link to="/">List</Link></li>
                        <li><Link to="/add-Task">Add Task</Link></li>
                        <li><Link onClick={logout}>Logout</Link></li>
                    </>
                ) : null}

            </ul>
        </nav>
    );
}

export default NavBar;