import { useState, useEffect } from "react";
import api from '../api'


export default function useFetch(url){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(()=>{
        (async()=>{
            try{
                const response = await api.get(url);
                console.log('res', response);
                setData(response.data);
            }catch(err){
                setError(err);
            }finally{
                setLoading(false);
            }
        })()
    },[url])

    return {data, loading, error}
}