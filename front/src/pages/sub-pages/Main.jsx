import React, { useEffect, useState, createContext, useContext } from 'react';
import { Spin, Tabs } from 'antd';
import Slider from '../../components/Slider'
import useFetch from '../../hooks/useFetch';
import { UserContext } from '../../context/UserContext';

function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function TabItemContent({url, setModalSettings, setIsLoading}){
  const [movieHTMLComponents, setMovieHTMLComponents] = useState([]);
  const {data, loading, error} = useFetch(url);

  useEffect(()=>{
    setIsLoading(loading)
  }, [loading])

  useEffect(() => {
    if(loading || error || !data) return

    const htmlElementCollection = [];

    const moviesByGenre = data.reduce((acc, movie) => {
      if (!acc[movie['genres.name']]){
        acc[movie['genres.name']] = [];
      } 
      acc[movie['genres.name']].push(movie);
      return acc;
    }, {});
    

    for(let key in moviesByGenre){
      moviesByGenre[key] = shuffle(moviesByGenre[key]);
      if(moviesByGenre.hasOwnProperty(key) && moviesByGenre[key].length > 6){
        htmlElementCollection.push(
          <div className='mt-[-28px] max-w-[90vw]' key={key}>
            <h3 className='text-primary font-semibold text-xl absolute left-10 uppercase font max-sm:text-lg'>{key}</h3>
                <Slider>
                  {moviesByGenre[key].map((movie, k)=>{
                    const movieItem = {
                      id: movie.id,
                      image: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
                      imageBg: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
                      title: movie.title,
                      description: movie.sinopse,
                    }
                    return <Slider.Item movie={movieItem} key={key + k + movie.id} setModalSettings={setModalSettings}>item1</Slider.Item>
                  })} 
                </Slider>
          </div>  
        )
      }
    }
    setMovieHTMLComponents(htmlElementCollection);
  }, [data]);
  
  
  return(
    <>
      <div className='flex flex-col min-h-[600px] items-center w-full mt-10' key={2}>
        {error ?
          <div className='text-center text-red-500 text-xl font-bold mt-10'>
            {error}
          </div>
        :
        loading ? 
        <div className='w-full flex justify-center items-center'>
            <Spin size='large'/>
          </div>
          :
          movieHTMLComponents
        }
      </div> 
    </>
  )
}



export default function Main({modalSettings, setModalSettings}){
  const {user} = useContext(UserContext);
  const [url,setUrl] = useState(`/movie?limit=200&raw=true&stregs=[${user}]`);
  const [isLoading, setIsLoading] = useState(true);
  console.log(user)

  const tabItems = [
    {
      key: '1',
      label: <h3 className='text-xl font-bold mx-8 max-sm:mx-2 max-sm:text-sm uppercase'>Descobertas</h3>,
      children: <TabItemContent url={url} modalSettings={modalSettings} setModalSettings={setModalSettings} setIsLoading={setIsLoading}/>
    },
    {
      key: '2',
      label: <h3 className='text-xl font-bold mx-8 max-sm:mx-2 max-sm:text-sm uppercase'>Recomendações</h3>,
      children: <TabItemContent url={url} modalSettings={modalSettings} setModalSettings={setModalSettings} setIsLoading={setIsLoading}/>
    },
  ];

  function handleTabChange(e){
      if(e === '1'){
          setUrl(`/movie?limit=200&raw=true`);
      }
      else{
        setUrl(`/movie?limit=200&raw=true`);
      }
  }

    return (
      <>
       
          <Tabs 
            className={`w-full ${isLoading && 'opacity-0'}`}
            tabBarStyle={{width:'100%', margin: 'auto'}}
            centered defaultActiveKey="1" 
            items={tabItems} 
            size='large'
            onChange={handleTabChange}
            indicatorSize={160}
            />
            <Spin size='large' className={`${isLoading ? 'opacity-100 absolute top-1/2 left-1/2' : 'hidden'}`}/>
      
      </>
    )
}

