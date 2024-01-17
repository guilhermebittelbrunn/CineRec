import { UserOutlined, RetweetOutlined } from '@ant-design/icons'
import { Input, Tooltip, Collapse, message } from 'antd'
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import {listOfStreaming} from '../../assets/images'
import api from "../../api";

export default function Profile(){
    const { handleLogout, user, setUser } = useContext(UserContext);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [providersList, setProvidersList] = useState([]);
    
    const sumActiveProviders = providersList.reduce((acc, provider) =>{
        if(provider.status){
            acc += 1;
        }
        return acc
    },0)

    const sumListWithMovies = user.Lists.reduce((acc,list)=>{
        if(list.movies.length > 0){
            acc += 1;
        };
        return acc
    },0)

    const sumMinutesWatched = countMinutesWatched();


    function countMinutesWatched(){
        const watchedList = user.Lists.filter(list=>list.name === "Assistidos")[0];
        const minutes = watchedList.movies.reduce((acc, movie)=>{
            acc += movie.duration ? movie.duration : 0; 
            return acc;
        }, 0);
        return minutes
    }


    useEffect(()=>{
        if(user.streamings){
            const newProviderList = listOfStreaming.map(provider=>{
                const index = user.streamings.find(streaming=>streaming.id === provider.id);
                if(index){
                    return{...provider, status:true}
                }else{
                    return{...provider, status:false}
                }
            });
            setProvidersList(newProviderList);
        }
        else{
            const newProviderList = listOfStreaming.map(streaming=>{return{...streaming, status:false}});
            setProvidersList(newProviderList);
        }
    },[user])

    async function handleChangeInformation(){
        const res = await api.put(`/user/${user.id}?email=${email}&name=${name}`);
        if (res.data.msg){
            console.log(res.data.msg);
            message.error(res.data.error);
        }
        if(res.data.user){
            message.success('Alteração feita com sucesso!');
            console.log(res.data.user);
            setUser(res.data.user);
        }
    }


    async function handleSave(){
        const streamings = providersList.filter(provider =>provider.status);
        const res = await api.post(`/streaming/${user.id}`, streamings);
        if(res.data.error){
            return message.error(res.data.msg);
        }
        if(res.data.user){
            message.success('Alteração feita com sucesso!');
            setUser(prev=>{
                return{
                  ...prev,
                    streamings: res.data.streamings
                }
            });
        }
    }

    function handleProviderClick(id){
        const x = providersList.reduce((acc,streaming)=>{
            if(streaming.id === id){
                acc.push({
                    ...streaming,
                    status: !streaming.status
                })
                return acc
            }
            acc.push(streaming);
            return acc
        },[])
        setProvidersList(x);
    }

    function handleCancel(){
        if(user.streamings){
            const newProviderList = listOfStreaming.map(provider=>{
                const index = user.streamings.find(streaming=>streaming.id === provider.id);
                if(index){
                    return{...provider, status:true}
                }else{
                    return{...provider, status:false}
                }
            });
            setProvidersList(newProviderList);
        }
        else{
            const newProviderList = listOfStreaming.map(streaming=>{return{...streaming, status:false}});
            setProvidersList(newProviderList);
        }
    }

    return(
        <div className="w-full flex flex-col gap-6 items-center justify-center">
            <header className='flex flex-col gap-4 w-full'>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <UserOutlined className='text-8xl border-4 border-font rounded-full p-4'/>
                    <h1 className='font-bold uppercase'>{user.name}</h1>
                </div>
                <div id="tags" className='flex w-full justify-center items-center gap-4 max-sm:flex-col'>
                    <div className='w-[180px] flex flex-col justify-center items-center max-sm:max-w-[340px] max-sm:w-full'>
                        <div id="header" className='bg-primary w-full text-center py-2 border rounded-t-lg border-backgroundOne'>
                            {sumMinutesWatched}
                        </div>
                        <div id="body" className='w-full text-center bg-neutral-900 py-1 border-backgroundOne border rounded-b-lg'>
                            Minutos assistidos
                        </div>
                    </div>
                    <div className='w-[180px] flex flex-col justify-center items-center max-sm:max-w-[340px] max-sm:w-full'>
                        <div id="header" className='bg-primary w-full text-center py-2 border rounded-t-lg border-backgroundOne'>
                            {sumListWithMovies}
                        </div>
                        <div id="body" className='w-full text-center bg-neutral-900 py-1 border-backgroundOne border rounded-b-lg'>
                            Listas criadas
                        </div>
                    </div>
                    <div className='w-[180px] flex flex-col justify-center items-center max-sm:max-w-[340px] max-sm:w-full'>
                        <div id="header" className='bg-primary w-full text-center py-2 border rounded-t-lg border-backgroundOne'>
                            {sumActiveProviders}
                        </div>
                        <div id="body" className='w-full text-center bg-neutral-900 py-1 border-backgroundOne border rounded-b-lg'>
                            Plataformas
                        </div>
                    </div>
                </div>
            </header>
            <h2 className='w-8/12 text-center font-semibold text-xl mt-2'>
                Informações da conta
            </h2>
            <div id='main' className='flex-col justify-center items-center flex w-full max-w-[600px] gap-3 mb-6 max-sm:w-11/12'>
                <div className='flex flex-col relative w-full'>
                    <span className='text-font text-md font-medium'>Nome</span>
                    <div className='flex'>
                        <Input size='large' type="text" placeholder='Nome' value={name} className='w-full rounded-none' onChange={(e)=>{setName(e.target.value)}}/>
                        <Tooltip title="Salvar alteração" className='bg-primary w-[40px] text-center flex justify-center border border-backgroundOne'>
                            <RetweetOutlined className=' transition-all hover:cursor-pointer hover:text-xl'onClick={handleChangeInformation}/>
                        </Tooltip>
                    </div>
                </div>

                <div className='flex flex-col relative w-full'>
                    <span className='text-font text-md font-medium'>E-mail</span>
                    <div className='flex'>
                        <Input size='large' type="text" value={email} placeholder='E-mail' className='w-full rounded-none' onChange={(e)=>{setEmail(e.target.value)}}/>
                        <Tooltip title="Salvar alteração" className='bg-primary w-[40px] text-center flex justify-center border border-backgroundOne'>
                            <RetweetOutlined className=' transition-all hover:cursor-pointer hover:text-xl' onClick={handleChangeInformation}/>
                        </Tooltip>
                    </div>
                </div>
              

                <Collapse
                    size='large'
                    className='w-full'
                    items={[
                        {
                        key: '1',
                        label: 'Plataformas',
                        children:
                           
                                <div className='container flex justify-center items-center gap-2 flex-col'>
                                    <div id='movie-section' className='flex flex-wrap gap-4 w-full justify-center max-sm:gap-2'>
                                         {providersList.map((streaming, key)=>{ 
                                            return ( 
                                                <div key={streaming.id}  style={{backgroundColor: '#212121'}} className={`${streaming.status ? 'border-primary' : 'border-gray-700'} border-2 flex flex-col p-2 text-center gap-2 rounded-md w-[20%] max-sm:w-[30%] h-[140px] justify-center items-center hover:cursor-pointer`} onClick={()=>{handleProviderClick(streaming.id)}}>
                                                    <img src={streaming.icon} alt={`${streaming.name}`} className='w-[80px] rounded-3xl max-sm:w-[60px]'/>
                                                    <span className='font-semibold text-font h-10  w-full flex justify-center items-center'>{streaming.name}</span>
                                                </div>
                                             ) 
                                         })} 
                                    </div>
                                    <div className='w-full flex justify-center items-center gap-4 mt-2'>
                                        
                                        <button 
                                            className='w-[140px] border border-neutral-950 
                                            rounded-lg py-2 px-4 transition-all
                                            hover:border-red-600 hover:text-red-600'
                                            onClick={handleCancel}
                                        >
                                            Cancelar
                                        </button>

                                        <button 
                                            className='w-[140px] border border-neutral-950 rounded-lg py-2
                                            px-4 transition-all hover:border-green-600 hover:text-green-600'
                                            onClick={handleSave}
                                        >
                                            Salvar
                                        </button>
                                    </div>
                                </div>
                            
                        
                        },
                    ]}
                />

                <Collapse
                    size='large'
                    className='w-full'
                    items={[
                        {
                        key: '1',
                        label: 'Listas',
                        children:
                           
                                <div>
                                    <ul>
                                        {sumListWithMovies > 0 ? 
                                            <>
                                                {user.Lists.map(list=>{
                                                    if(list.movies.length > 0){
                                                        return (
                                                            <li key={list.id} className='flex w-full border-b-2 justify-between mt-2 border-primary'>
                                                                <span className='font-semibold'>{list.name}</span>
                                                                <p>{(list.movies).length} filmes</p>
                                                            </li>
                                                        )
                                                    }
                                                })}
                                            </>

                                            :
                                            <div className='text-center'>
                                                <h3 className=''>Suas listas com filmes apareceram aqui, no momento <p className='text-red-500'>você não tem nenhuma lista</p></h3>
                                            </div>
                                        }
                                    </ul>
                                </div>
                        },
                    ]}
                />

                <button 
                    className='border border-red-600 text-red-600 font-medium
                    py-3 px-8 w-[200px] mt-2 rounded-lg transition-all hover:opacity-80'
                    onClick={handleLogout}    
                >
                    Sair da conta
                </button>
            </div>
            {/* <h4>{user.name}</h4>
            <button onClick={handleClick} className="bg-blue-300">Fazer requisição teste</button>
            <br></br>
            <button onClick={handleLogout} className="bg-red-500">Logout</button> */}
        </div>
    )
} 