import { useState, useEffect, createContext } from "react";
import { Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api";

export const UserContext = createContext();

export default function UserProvider({children}){
    const [user,setUser] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()


    async function handleLogin(data){
        const {email, password} = data;
        if(!email || !password) return message.warning('Preencha todos os campos')
        try{
            const res = await api.post('user/login', data);
            const { status } = res.request;
            if(status === 200){
                const {userData, token} = res.data;
                // const token = res.headers['authorization-token'];
                setTokenAndUserDate(userData, token);
                return navigate('/');
            } 
            throw res.data
        }catch(err){
            message.error('E-mail ou senha incorretos')
            console.log(err);
        }
    }

    function handleLogout(){
        localStorage.clear('token');
        setUser();
        navigate('/');
    }

    function setTokenAndUserDate(userData, token){
        localStorage.setItem('token', token);
        api.defaults.headers['authorization-token'] = token;
        setUser(userData);
    }


    useEffect(()=>{
        (async()=>{
            const token = localStorage.getItem('token');
            if(token){
                api.defaults.headers['authorization-token'] = token;
                const {id} = JSON.parse(atob(token.split('.')[1]));
                try {
                    const {data} = await api.get(`user/${id}`);
                    console.log(data);
                    setUser(data);
                } catch (error) {
                    console.log(error);
                    handleLogout();
                    message.warning('Sessão expirada, faça login novamente');
                }
            }
            setLoading(false);
        })()
    },[])

    
    return(
        <UserContext.Provider value={{user, setUser, loading, handleLogout, handleLogin}}>
            {loading ? <Spin /> : children}
        </UserContext.Provider>
    )
}