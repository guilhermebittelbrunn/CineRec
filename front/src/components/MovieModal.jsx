import { CloseOutlined, StarFilled, StarOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect, useState, useContext } from 'react';
import useFetch from '../hooks/useFetch'
import { Spin, Tooltip, Popconfirm, Input, Tabs } from 'antd';
import { images } from '../assets/images'
import {UserContext} from '../context/UserContext'
import { Select, message, Tag } from 'antd'
import api from '../api';
import dayjs from 'dayjs';
import axios from 'axios';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmI0OWNmMzQzYzU2MmRmYmM4YjczMTlmMmZmMmI3NyIsInN1YiI6IjY0Yzk4MWE5MDAxYmJkMDEyNmE3MjAxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZqK6DNET911i81ING_Q6emqC5yGF_TYDy_4Uc1YDGnY'
  }
};


export default function MovieModal({id, status, setIsModalOpen}){
    if(!id || !status)return
    const {user} = useContext(UserContext);
    const [selectedItems, setSelectedItems] = useState([]);
    const [options, setOptions] = useState([]);
    const {data, loading, error} = useFetch(`movie/${id}?idUser=${user.id}`);
    const [activeTab, setActiveTab] = useState('1');
    const [tabItems, setTabItems] = useState([])

    function handleCloseModal(e){
        const backgroundModal = document.getElementById('backgroundModal');
        if(e.target === backgroundModal){
            setIsModalOpen({id: null, status:false});
        }
    }

    function handleClickMovieList(listName, status){
        status ? postMovieList(listName, id) : removeMovieList(listName, id)
    }


    function findListInSelectedItems(listName){
        return selectedItems.find(item=>item === listName)
         
    }

    async function postMovieList(listName, id){
        const res = await api.post(`/lists/${user.id}`, {name:listName, idMovie: id});
        setSelectedItems(pv=>{
            return [...pv, res.data.name]
        });
    }
    async function removeMovieList(listName, id){
        const res = await api.delete(`/lists/${id}?name=${listName}`);
        setSelectedItems(selectedItems.filter(item=>item !== res.data.name));
    }

    useEffect(() => {
        if(loading && error)return
        if(data.Lists && user){
            (async()=>{
                const res = await api.get(`/lists/${user.id}`);
                const listOptions = res.data.map(list=>list.name)
                setOptions(listOptions);
            })();
            setSelectedItems(data?.Lists.map(list=>list.name));
        }
    }, [data])

    useEffect(()=>{
    
        const tabs = [
            {
                key: '1',
                label: <h3 className='text-sm font-semibold w-full capitalize px-6'>Detalhes</h3>,
                children: 
                    <Tab1 
                        data={data} id={id} user={user} options={options} setOptions={setOptions}
                        selectedItems={selectedItems} handleClickMovieList={handleClickMovieList}
                        setSelectedItems={setSelectedItems} removeMovieList={removeMovieList}
                        findListInSelectedItems={findListInSelectedItems} postMovieList={postMovieList}
                    />
            },
            {
                key: '2',
                label: <h3 className='text-sm font-semibold w-full capitalize'>Recomendações</h3>,
                children: <Tab2 id={data.idAPI} setIsModalOpen={setIsModalOpen} setActiveTab={setActiveTab}/>
            }
        ]

        setTabItems(tabs)

    },[data, options, selectedItems])

    if(status){
        return(
            <>
                <div 
                    id='backgroundModal'
                    className='w-full h-[100%] z-20 left-0 top-0 fixed overflow-hidden' 
                    style={{backgroundColor: 'rgba(27, 27, 27, .7)'}}
                    onClick={handleCloseModal}
                >
                    <div 
                        id='content'
                        className='bg-secondery opacity-100 rounded-md border-[2px] border-primary 
                        flex flex-col justify-between  items-center absolute top-2/4 min-h-[300px]
                        left-2/4 transform translate-x-[-50%] translate-y-[-50%] max-h-[98vh] w-[95%] max-w-[500px]
                    '>
                        {loading ? 
                        <Spin size='large' className='m-auto'/>
                        :
                        <div className='flex flex-col justify-between items-center w-full'>
                            <CloseOutlined 
                                className='absolute top-3 right-3 transition-all font-bold
                                hover:cursor-pointer hover:scale-110 z-20 text-2xl rounded-full p-1'
                                style={{backgroundColor: 'rgba(0,0,0,.2)'}}
                                onClick={()=>{setIsModalOpen({id: null, status: false})}}
                            />
                            {
                                findListInSelectedItems('Favoritos') ?
                                    <StarFilled 
                                        className='absolute top-3 left-2 transition-all 
                                        hover:cursor-pointer hover:scale-110 z-20 text-2xl
                                        text-yellow-400'
                                        onClick={()=>{handleClickMovieList('Favoritos',false)}}
                                    />
                                    :
                                    <StarOutlined 
                                        className='absolute top-3 left-2 transition-all 
                                        hover:cursor-pointer hover:scale-110 z-20 text-2xl
                                        text-yellow-400'
                                        onClick={()=>{handleClickMovieList('Favoritos',true)}}
                                    />
                            }
                           
                            
                                <div className='relative flex justify-center items-center w-full'>
                                    <img src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`} alt={data.title} className='min-w-full min-h-[160px] border border-secondery rounded-t-md z-10'/>
                                    {data.streamings.length > 0  &&
                                    <div className='absolute gap-4 left-[0%] bottom-0 w-full flex justify-center items-centerbottom-0 z-20 py-2' style={{backgroundColor: 'rgb(0,0,0, .3)'}}>
                                            {data.streamings.map((streaming, key)=>{
                                                const provider = images[streaming.id];
                                                return(
                                                    <Tooltip title={provider?.name} key={`${provider?.id}${key}`}>
                                                        <img src={provider?.icon} className='w-[35px] rounded-full transition-all hover:scale-150' alt={provider?.name}/>
                                                    </Tooltip>
                                                ) 
                                            })}
                                    </div>
                                    }
                                    <Spin className='absolute left-[45%] top-24' size='large'/>
                                </div>
                                
                                <div className='flex flex-col w-full'>
                                    <div className='flex flex-col py-2'>
                                        <span className='font-bold text-center text-primary text-lg'>{data.title}</span>
                                        <span className='w-full mt-[-4px] text-center text-[14px] text-gray-400'>{dayjs(data.release).format('DD-MM-YYYY')}</span>
                                    </div>
                                    <Tabs
                                        type='card'
                                        activeKey={activeTab}
                                        className={`w-full ${loading && 'opacity-0'}`}
                                        tabBarStyle={{width:'100%', margin: 'auto'}}
                                        centered 
                                        defaultActiveKey={activeTab}
                                        items={tabItems} 
                                        size='small'
                                        onChange={(key) => setActiveTab(key)}
                                    />
                                    
                                </div>
                            
                            
                        </div> 
                        
                        }
                    </div>
                </div>
            </>
        )
    }
}


function Tab1({data, user, id, handleClickMovieList, handleCreateList, selectedItems, setSelectedItems, options, setOptions, removeMovieList, findListInSelectedItems, postMovieList}){

    const [popConfirmInputValue, setPopConfirmInputValue] = useState('');
    const filteredOptions = options.filter((o) => !selectedItems.includes(o));

    async function handleCreateList(e){
        if(!popConfirmInputValue)return

        try{
            const res = await api.post('/lists', {idUser: user.id, name: popConfirmInputValue});
            setOptions(res.data.map(list=>list.name));
        }catch(err){
            if(err.response?.data.error){
                message.error('Já existe uma lista com esse nome');
            }else{
                console.log(err);
            }
        }finally{
            setPopConfirmInputValue('');
        }
    }

    async function handleChangeSelect(value){
        postMovieList(value[value.length - 1], id)
    }



    return(
    <>
        <div id='tags' className='flex mt-4 items-center justify-center gap-4 flex-wrap max-sm:gap-0'>
            {data.genres &&
                data.genres.map(genre=>{
                    return(
                        <div key={genre.id} className='borde rounded-sm border-primary px-2 text-sm'>
                            {genre.name}   
                        </div>
                    )
                })
            }
        </div>

        <div className='flex justify-between px-4 w-full'>
            <div className='flex justify-center items-center'>
                <span className='font-bold my-2 text-center text-sm text-gray-200'>Nota: {String(data.vote).slice(0,3)} </span>
                <span className='font-bold text-sm text-gray-400'>/ 10 IMDb</span>
            </div>
            <div className='flex justify-center items-center gap-1 mr-2'>
                <span className='font-bold my-2 text-center text-sm text-gray-200'>Duração: {data.duration} </span>
                <span className='font-bold text-sm text-gray-400'> minutos</span>
            </div>
        </div>

        <p id='modal-section' className='text-sm mx-4 pr-2 my-2 text-justify max-h-[120px] overflow-auto rounded-lg max-sm:max-h-[100px]'>{data.sinopse}</p>
        <span className='text-sm text-primary ml-4 font-medium'>Listas</span>
        <div id='bts' className='flex flex-col justify-center items-center gap-2  px-4 pb-2 w-full'>
            <div className='flex w-full m-auto justify-center items-center gap-1'>
                <Select
                    notFoundContent={null}
                    id='select-modal'
                    mode="multiple"
                    placeholder="Este filme não está em nenhuma de suas listas"
                    tagRender={(data)=>{return (<TagRender {...data} id={id} onClose={removeMovieList}/>)}}
                    value={selectedItems}
                    onClose={removeMovieList}
                    onChange={(e)=>{handleChangeSelect(e)}}
                    style={{
                        width: '100%',
                    }}
                    options={filteredOptions.map((item) => ({
                        value: item,
                        label: item,
                    }))}
                />
                    <Popconfirm 
                        className='border-2'
                        id='select-modal'
                        title="Criar uma lista nova"
                        placement='left'
                        icon={false}
                        description={
                            <Input value={popConfirmInputValue} 
                            onChange={(e)=>{setPopConfirmInputValue(e.target.value)}}
                                id='select-modal' type='text' placeholder='Nome da lista'/>
                        }
                        onConfirm={handleCreateList}
                    >
                        <Tooltip title="Criar uma lista nova">
                                <button className='border border-primary px-2 rounded-sm text-primary font-bold text-lg'>
                                    <PlusOutlined/>
                                </button>
                        </Tooltip>
                    </Popconfirm>
            </div>

            {
                findListInSelectedItems('Assistidos') ?
                    <button 
                        className='border border-red-600 py-2 px-4 text-sm rounded-md w-[100%] transition-all
                        bg-red-600 font-medium drop-shadow-2xl hover:opacity-80' onClick={()=>{handleClickMovieList('Assistidos',false)}} 
                    >
                            Marcar como não assistido
                    </button>
                    :
                    <button 
                        className='border border-primary py-2 px-4 text-sm rounded-md w-[100%] transition-all
                        bg-primary font-medium drop-shadow-2xl hover:opacity-80' onClick={()=>{handleClickMovieList('Assistidos',true)}}
                    >
                        Marcar como assistido
                    </button>
            }

                {
                    findListInSelectedItems('Assistir mais tarde') ?
                    <button 
                        className='border border-white py-2 px-4 text-sm rounded-md w-[100%] transition-all
                        font-medium hover:text-primary hover:border-primary' onClick={()=>{handleClickMovieList('Assistir mais tarde',false)}}
                    >   
                        Remover de Assistir mais tarde
                    </button>
                    :
                    <button 
                        className='border border-white py-2 px-4 text-sm rounded-md w-[100%] transition-all
                        font-medium hover:text-primary hover:border-primary' onClick={()=>{handleClickMovieList('Assistir mais tarde', true)}}
                    >   
                        Adicionar em assistir mais tarde
                    </button>
                }
        </div>
    </>
)
}


function TagRender( { label, value, closable, onClose, id }){


  return (
    <Tag
      color={value}
      closable={closable}
      closeIcon
      onClose={()=>{onClose(label, id)}}
      style={{
        border: '1px solid #09B54E',
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};



function Tab2({id, setIsModalOpen, setActiveTab}){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    function handleClickRecommendation(id){
        setIsModalOpen({status:true, id});
        setActiveTab('1');
    }
    
    useEffect(()=>{
        (async()=>{
            try {
                setLoading(true);
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=pt-BR&page=1`, options)
                const listIdApi = res.data.results.map(result=>result.id);
                const listMovies = await api.get(`/movie?limit=6&listIdApi=[${listIdApi}]`);
                setData(listMovies.data);
            } catch (error) {
                console.log(error);
                setError(error);
            }finally{
                setLoading(false)
            }
        })()
    },[id])

    return(
        <div className='min-h-[340px] flex flex-col justify-center items-center mt-4 mb-2 max-sm:my-0'>
            {
                loading ? 
                    <Spin size='large'/>
                :
                error ? 
                    <h1>Erro: {error}</h1>
                :
                    <div id='movie-section' className='flex w-full max-h-[300px] overflow-auto  flex-wrap justify-center items-center gap-3 px-3'>
                        {
                            data.map(movie=>{
                                return(
                                    <div key={movie.id} className='w-[24%] hover:cursor-pointer' onClick={()=>{handleClickRecommendation(movie.id)}}>
                                            <Tooltip title={movie.title}>
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}/>
                                                {/* <img className=' rounded-md w-full' src='https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg' alt={data.title}/> */}
                                            </Tooltip>
                                    </div>
                                )
                            })
                        }
                    </div>
                          
            }
        </div>
    )
}