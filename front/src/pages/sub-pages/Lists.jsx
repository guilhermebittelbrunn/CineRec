import { useContext, useEffect, useState } from "react";
import { UserContext } from '../../context/UserContext'
import Slider from "../../components/Slider";
import { Spin, Popconfirm } from "antd";
import { MovieContext } from "../../context/MovieListsContext";
import api from "../../api";
import { CloseOutlined } from '@ant-design/icons'


export default function Lists({setModalSettings}){
    const { user } = useContext(UserContext);
    const { selectedItems } = useContext(MovieContext)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    async function deleteList(id){
        try {
            const res = await api.delete(`/list/${id}`);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
        (async()=>{
            try{
                setLoading(true);
                const res = await api.get(`/lists/${user.id}`);
                setData(res.data);
            }catch(err){
                console.log(err);
            }finally{
                setLoading(false)
            }
        })()

    },[selectedItems])



    return(
        <div>
            {loading ?
            <Spin size='large'/>
            :
            <div className="flex flex-col justify-center items-center">
               {data.map(list=>{
                    if(list.movies.length > 0){
                        return (
                            <div key={list.id} className="w-full relative">
                                <div className="flex w-full justify-between items-center aboslute mb-[-24px]">
                                    <h3 className='text-primary font-semibold text-xl uppercase font ml-10 max-sm:text-lg z-20'>{list.name}</h3>
                                    <Popconfirm placement="left" title="Excluir lista?" onConfirm={()=>{deleteList(list.id)}}> 
                                        <CloseOutlined 
                                            className="text-primary z-20 font-bold hover:cursor-pointer
                                            transition-all hover:scale-110 text-xl"
                                        />
                                    </Popconfirm>
                                    
                                    {/* {(list.name !== 'Favoritos' &&) && */}
                                    {/* } */}
                                </div>
                                <Slider>
                                    {list.movies.map((movie, k)=>{
                                        const movieItem = {
                                            id: movie.id,
                                            image: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
                                            imageBg: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
                                            title: movie.title,
                                            description: movie.sinopse,
                                        }
                                        return <Slider.Item setModalSettings={setModalSettings} movie={movieItem} key={movie.id}>item1</Slider.Item>
                                    })} 
                                </Slider>
                            
                            </div>
                        )
                    }
               })}
            </div>

            }    
        </div>
    )




}