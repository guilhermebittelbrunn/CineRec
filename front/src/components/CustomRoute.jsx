import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function CustomRoute({children}){
    const {user} = useContext(UserContext);

    return user ? <Navigate to='/'/> : children
}