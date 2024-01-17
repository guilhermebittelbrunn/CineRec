import { message, Spin } from 'antd'
import { UserOutlined, MailOutlined, KeyOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form' 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listOfStreaming } from '../assets/images'
import { Link } from 'react-router-dom'
import api from '../api';

export default function Register(){
    const { control, handleSubmit, register } = useForm();
    const [phase, setPhase] = useState(1);
    const [movies, setMovies] = useState([]);
    const [providersList, setProvidersList] = useState(listOfStreaming.map(streaming=>{return{...streaming, status:false}}));
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    async function handleConfirm(data){
        const {name, email, password, confirm_password} = data;
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        
        if(name.trim().length < 3 || name === undefined) return message.warning('Informe um nome');
        if(!regex.test(email)) return message.warning('Informe um e-mail válido');
        if(password.trim().length < 8 && confirm_password.trim().length < 8) return message.warning('Informe um senha com pelo menos 8 caracteres');
        if(password !== confirm_password) return message.warning('Senhas não coicidem');
        
        const res = await api.get(`user?email=${email}`);
        if(res.status == 226)return message.error('E-mail já em uso')  
        
        setPhase(pv=>pv+1)
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

    function handleMovieClick(id){
        const x = movies.reduce((acc,movie)=>{
            if(movie.id === id){
                acc.push({
                    ...movie,
                    status: !movie.status
                })
                return acc
            }
            acc.push(movie);
            return acc
        },[])
        setMovies(x);
    }

    function handleClickOutModal(e){
        const backgroundModal = document.getElementById('background-modal');
        if(e.target === backgroundModal){
            setPhase(previousValue=> previousValue - 1);
        }
    }


    async function handleSubmitForm(data){
    
        const favoriteProviders = providersList.filter(provider=>provider.status);
        const favoriteMovies = movies.filter(movie=>movie.status);
        const userData = {...data, streamings: favoriteProviders, movies: favoriteMovies}
       
        if(favoriteMovies.length < 5){
            return message.warning('Selecione pelo menos 5 filmes para criar a conta');
        }
        try{
            setIsLoading(true);
            const res = await api.post('/user/create', userData);
            if(res.status === 201){
                message.success(`Usuário ${res.data.userName} criado com sucesso!`);
                setTimeout(()=>{
                    navigate('/login');
                }, 1200)
            }
        }catch(err){
            console.log(err);
        }finally{
            setIsLoading(false);
        }
        
    }

    useEffect(()=>{
        (async()=>{
            try{
                const {data} = await api.get('/movie?limit=78');
                const movieList = data.map(movie=>{return {...movie, status:false}})
                setMovies(movieList);
            }catch(err){
                console.log(err);
                message.error('Um erro ocorreu ao carregar os filmes, por favor tente novamente mais tarde');
            }
        })()
    },[]);

    return(
        <>

            <div className={`w-full max-w-5xl m-auto py-2 flex justify-center items-center sm:absolute sm:top-2/4 sm:left-2/4 sm:transform sm:translate-x-[-50%] sm:translate-y-[-50%]`}>
                <div className='flex flex-col justify-center items-center text-font w-full'>
            
                    <form className='flex flex-col justify-center items-center gap-2 w-full' onSubmit={handleSubmit(handleSubmitForm)}>
                    {phase === 1 &&
                        <div className='px-4 flex flex-col justify-center items-center gap-2 w-full'>
                            <h1 className='font-bold text-xl'>Crie a sua conta</h1>                    
                            <div className='border-[1.5px] mb-2 bg-secondery gap-4 px-8 py-8 border-primary flex flex-col justify-center items-center rounded-lg max-w-[400px] w-full lg:w-[38%]'>
                                    <div className='flex px-2 py-1 border-[1px] rounded-md border-primary bg-secondery text-font text-lg w-full'>
                                        <div className='w-[24px] mr-[10px] text-primary flex justify-center items-center'>
                                            <UserOutlined/>
                                        </div>
                                        <input type='text' {...register('name')} placeholder='Nome' className='bg-secondery outline-none text-font border-hidden w-full text-lg'/>
                                    </div>
                                    <div className='flex px-2 py-1 border-[1px] rounded-md border-primary bg-secondery text-font w-full'>
                                        <div className='w-[24px] mr-[10px] text-primary flex justify-center items-center'>
                                            <MailOutlined />
                                        </div>
                                        <input type='email' {...register('email')} placeholder='E-mail' className='bg-secondery outline-none text-font border-hidden w-full text-lg'/>
                                    </div>
                                    <div className='flex px-2 py-1 border-[1px] rounded-md border-primary bg-secondery text-font w-full'>
                                        <div className='w-[24px] mr-[10px] text-primary flex justify-center items-center'>
                                            <KeyOutlined className='rotate-180'/>
                                        </div>
                                        <input type='password' {...register('password')} placeholder='Senha' className='bg-secondery outline-none text-font border-hidden w-full text-lg'/>
                                    </div>
                                    <div className='flex px-2 py-1 border-[1px] rounded-md border-primary bg-secondery text-font w-full'>
                                        <div className='w-[24px] mr-[10px] text-primary flex justify-center items-center'>
                                            <KeyOutlined className='rotate-180'/>
                                        </div>
                                        <input type='password' {...register('confirm_password')} placeholder='Confirmar senha' className='bg-secondery outline-none text-font border-hidden w-full text-lg'/>
                                    </div>
                                    <div className='flex flex-col w-full justify-center items-center gap-3 mt-1'>
                                        <button onClick={handleSubmit(handleConfirm)} type='button' className='w-4/5 bg-primary mt-2 border-hidden text-font py-2 rounded-md hover:bg-green-600 hover:text-font text-lg font-semibold'>Confirmar</button>
                                        <Link to='/login' className='text-base text-font opacity-80 text-center hover:opacity-100 hover:cursor-pointer'>Já possui conta? Faça login</Link>
                                    </div>
                            </div>
                        </div>
                    }
                    {
                        phase === 2 &&
                        <>
                            <h1 className='font-bold text-xl mb-4'>Escolha suas plataformas favoritas</h1>             
                            <div>
                                <div className='gap-4 px-10 flex flex-col justify-center items-center rounded-lg'>
                                    <div id='movie-section' className='flex flex-wrap gap-4 justify-center max-sm:gap-2 overflow-auto h-[80vh] max-xl:h-[70vh]'>
                                        {providersList.map((streaming, key)=>{
                                            return (
                                                <div id={streaming.id} key={key} style={{backgroundColor: '#212121'}} className={`${streaming.status ? 'border-primary' : 'border-gray-700'} border-2 flex flex-col p-2 text-center gap-2 rounded-md w-[20%] max-sm:w-[30%] h-[140px] justify-center items-center hover:cursor-pointer`} onClick={()=>{handleProviderClick(streaming.id)}}>
                                                    <img src={streaming.icon} alt={`${streaming.name}`} className='w-[80px] rounded-3xl max-sm:w-[60px]'/>
                                                    <span className='font-semibold text-font h-10  w-full flex justify-center items-center'>{streaming.name}</span>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div id='btns' className='flex font-semibold w-full justify-between gap-2 px-4 text-lg mt-2 max-sm:flex-col max-sm:my-6 max-sm:items-center'>
                                        <button className='py-2 px-4 rounded-sm border-[1px] border-primary w-[180px] max-sm:w-full max-sm:order-2 lg:opacity-70 hover:opacity-100' onClick={()=>{setPhase(pv=>pv-1)}}>Anterior</button>
                                        <button className='py-2 px-4 border-[1px] border-primary w-[180px] max-sm:w-full max-sm:order-1 lg:opacity-70 hover:opacity-100' onClick={()=>{setPhase(pv=>pv+1)}}>Avançar</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {
                        (phase === 3 || phase === 4) &&
                        
                        <div className='flex flex-col justify-center text-center items-center w-full px-2'>
                            <h1 className='font-bold text-xl mb-4'>Escolha seus filmes favoritos</h1>   
                                <div>
                                    {movies.length > 0 &&
                                        <div id='movie-section' className='flex flex-wrap justify-center gap-2 w-full overflow-auto h-[75vh]'>
                                            {movies.map((movie, key)=>{
                                                return(
                                                    <div key={key} className={`w-[155px] max-sm:w-[100px] border-2 hover:cursor-pointer ${movie.status ? 'border-primary' : 'border-gray-700'}`} onClick={()=>{handleMovieClick(movie.id)}}>
                                                        <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} className='w-[160px] h-[220px] bg-posternull max-sm:w-[100px] max-sm:h-[130px]' style={{backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}/>
                                                        <p className='text-sm text-font font-semibold mt-1 max-sm:text-xs'>{movie.title}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>    
                                    }
                            
                                </div>

                            <div id='btns' className='flex font-semibold w-full justify-between px-4 gap-2 text-lg mt-2 max-sm:flex-col max-sm:my-6 max-sm:items-center'>
                                <button className='py-2 px-4 rounded-sm border-[1px] border-primary w-[180px] max-sm:text-base max-sm:py-1 max-sm:px-2 max-sm:w-4/5 max-sm:order-2 lg:opacity-70 hover:opacity-100' onClick={()=>{setPhase(pv=>pv-1)}}>Anterior</button>
                                <button className='py-2 px-4 border-[1px] border-primary w-[180px] max-sm:text-base max-sm:py-1 max-sm:px-2  max-sm:w-4/5 max-sm:order-1 lg:opacity-70 hover:opacity-100' onClick={(e)=>{e.preventDefault();setPhase(pv=>pv+1)}}>Criar conta</button>
                            </div>
                        </div>
                    }
                    {
                        phase === 4 &&
                        <div id='background-modal' className='w-screen h-screen absolute' style={{backgroundColor: 'rgba(27, 27, 27, .7)'}} onClick={handleClickOutModal}>
                            <div className='bg-secondery opacity-100 rounded-sm border-[2px] border-primary flex flex-col justify-between py-4 items-center w-[380px] absolute top-2/4 left-2/4 transform translate-x-[-50%] translate-y-[-50%]'>
                                {isLoading ?
                                    <Spin/>
                                :
                                <>
                                    <h2 className='font-semibold text-lg'>Você deseja confirmar seu registro?</h2>
                                    <div className='w-full px-8 flex flex-col gap-4 py-4'>
                                        <div>
                                            <div className='flex justify-between'>
                                                <h3 className='font-bold'>Número de serviços selecionados</h3>
                                                <span>{providersList.filter(provider=>provider.status).length}</span>
                                            </div>
                                            <details>
                                                <summary className='cursor-pointer'>Lista de plataformas</summary>
                                                <ul className='max-h-[90px] overflow-auto' id='movie-section'>
                                                    {providersList.map((provider, k)=>{
                                                        if(provider.status){
                                                            return(
                                                                <div key={k} className='border-b-2 border-primary'>
                                                                    <li key={provider.id}>{provider.name}</li>
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </ul>
                                            </details>
                                        </div>
                                        <div>
                                            <div className='flex justify-between'>
                                                <h3 className='font-bold'>Número de filmes selecionados</h3>
                                                <span>{movies.filter(movie=>movie.status).length}</span>
                                            </div>
                                            <details>
                                                <summary className='cursor-pointer'>Lista de filmes</summary>
                                                <ul className='max-h-[90px] overflow-auto' id='movie-section'>
                                                    {movies.map((movie,k)=>{
                                                        if(movie.status){
                                                            return(
                                                                <div key={k} className='border-b-2 border-primary'>
                                                                    <li key={movie.id}>{movie.title}</li>
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </ul>
                                            </details>
                                        </div>
                                    </div>
                                    <div className='flex justify-between w-full px-4 mt-2'>
                                        {isLoading ?
                                            <Spin/>
                                            :
                                            <>
                                                <button onClick={()=>{setPhase(phase -1)}} className='w-[120px] bg-backgroundOne border-[2px] border-primary rounded-md px-3 py-1 transition-all opacity-70 hover:opacity-100'>Cancelar</button>
                                                <button type='submit' className='w-[120px] bg-backgroundOne border-[2px] border-primary rounded-md px-3 py-1 transition-all opacity-70 hover:opacity-100'>Confirmar</button>
                                            </> 
                                        }
                                    </div>
                                </>
                                }
                            </div>
                        </div>
                    }
                    </form> 

                    <div id='phases' className='flex gap-2'>
                        <div className={`w-3 h-3 rounded-full ${phase > 0 ? 'bg-primary' : 'bg-slate-700'}`}></div>
                        <div className={`w-3 h-3 rounded-full ${phase > 1 ? 'bg-primary' : 'bg-slate-700'}`}></div>
                        <div className={`w-3 h-3 rounded-full ${phase > 2 ? 'bg-primary' : 'bg-slate-700'}`}></div>
                    </div>
                </div>
            </div>

            
            
        </>
    )
}


