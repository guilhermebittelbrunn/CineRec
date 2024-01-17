import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { message } from "antd";

export default function PriveteRouter({children}){
    const { user } = useContext(UserContext);
    !user && message.warning('Por favor realize o login');

    return user ?  children : <Navigate to={'/'}/>
    
} 