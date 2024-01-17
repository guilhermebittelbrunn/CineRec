import { useState, useEffect } from 'react';
import { Select, Input, Spin } from 'antd';
import api from '../../api';

export default function SearchSection({setModalSettings}){
    const [title, setTItle] = useState('');
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [genre, setGenre] = useState('');
    const [loading, setLoading] = useState(true);

    function handleMovieClick(id){
        setModalSettings({id: id, status:true});
    }

    useEffect(()=>{
        (async()=>{
            try{
                const moviesApi = await api.get('/movie?limit=133');
                const genresApi = await api.get('/genres');

                const genreSelectOptions = genresApi.data.map(genre=>{
                        return {value: genre.id, label: genre.name}
                });

                setMovies(moviesApi.data);
                setGenres([{value: '', label: 'Todos os gêneros'}, ...genreSelectOptions]);
            }catch(error){
                console.log(error);
                return;
            }finally{
                setLoading(false);
            }
        })();
    },[])

    useEffect(()=>{
        (async()=>{
            try {
                const movies = await api.get(`/movie?limit=&title=${title.trim()}&genres=[${genre}]`);
                setMovies(movies.data);
            } catch (error) {
                console.log(error);
            }
        })();
    },[title, genre])

    if(loading){
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <Spin />
            </div>
        )
    }

    return(
        <>
            <div className='flex w-full justify-center items-center my-2 gap-4'>
                <div className='flex gap-4'>
                    <Select
                        value={genre}
                        defaultValue={''}
                        size='large'
                        onChange={(v)=>{setGenre(v)}}
                        className='w-[240px] max-sm:w-[120px]'
                        dropdownStyle={{backgroundColor: 'black', color: 'red'}}
                        options={genres}
                    />

                    <Input 
                        type='text' 
                        value={title} 
                        onChange={(e)=>{setTItle(e.target.value);}} 
                        placeholder='Título' 
                        size='large'
                        className='bg-secondery w-[240px] max-sm:w-[200px]'

                    />
                </div>
            </div>
            <div>
                <div id='movie-section' className='flex flex-wrap justify-center gap-2 w-full overflow-auto max-h-[800px]'>
                    {movies.length > 0 ?
                        movies.map((movie, key)=>{
                            return(
                                <div 
                                    key={key} className={`w-[155px] max-h-[320px] max-sm:w-[100px]
                                    transition-colors border-gray-700
                                    border-2 hover:cursor-pointer hover:border-primary`} 
                                    onClick={()=>{handleMovieClick(movie.id)}}
                                >
                                    <img 
                                        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} 
                                        className='w-[160px] h-[220px] bg-posternull max-sm:w-[100px] max-sm:h-[130px]' 
                                        style={{backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}
                                    />
                                    <p className='text-sm text-font font-semibold text-center py-1 mt-1 max-sm:text-xs'>{movie.title}</p>
                                </div>
                            )
                        })
                        :
                        <div className='flex justify-center items-center w-full'>
                            <h3 className='text-xl font-bold'>Filme não encontrado</h3>
                        </div>
                    }
                </div>    
            </div>
            
        </>
    )
}