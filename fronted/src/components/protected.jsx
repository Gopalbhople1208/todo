import {Navigate} from "react-router-dom"

function Protected({children}){

    const isLogin = localStorage.getItem('login') || sessionStorage.getItem('login');

    if(!isLogin){
        return <Navigate to="/login" replace />
    }

    return children
}

export default Protected;