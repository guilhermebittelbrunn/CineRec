import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import {UserContext} from '../context/UserContext'
import { UserOutlined, GithubOutlined, LinkedinFilled, MailOutlined, MenuOutlined } from '@ant-design/icons'
import { Drawer, Carousel } from 'antd'
import ImageIcon from '../assets/logo.png'
import MovieModal from "../components/MovieModal";
import { MovieContext } from "../context/MovieListsContext";

const menuOptions = [
    {
        id: 1,
        path: '/',
        label: 'Home'
    },
    {
        id: 2,
        path: '/lists',
        label: 'Listas'
    },
    {
        id: 3,
        path: '/search',
        label: 'Buscar'
    },
    {
        id: 4,
        path: '/profile',
        label: <UserOutlined />
    },
]

export default function Home({children, title, subtitle}){
    const {options, setOptions} = useContext(MovieContext);
    const {user, handleLogout} = useContext(UserContext);
    const [modalSettings, setModalSettings] = useState({id: null, status: false});
    const [open, setOpen] = useState(false);


    return(
        <div className="w-full flex flex-col justify-between h-screen max-w-7xl px-[1%] m-auto ">
            <nav className="flex w-full justify-between text-lg py-2">
                <div className="flex gap-2 justify-center items-center">
                    <Link to='/'>
                        <img src={ImageIcon} alt="logo" className="md:w-[160px] sm:w-[120px] max-sm:w-[120px]"/>
                    </Link>
                    {/* <h2>CineSync</h2> */}
                </div>
                {user &&
                <>
                    <ul className="flex gap-4 justify-center items-center max-sm:hidden">
                                {
                                    menuOptions.map(option=>{
                                        return(
                                            <Link to={option.path} key={option.id}>
                                                <li className="font-semibold transition-all hover:cursor-pointer hover:text-primary">
                                                    {option.label}
                                                </li>
                                            </Link>
                                        )
                                    })
                                }
                    </ul>
                    <MenuOutlined 
                    className="sm:hidden font-semibold text-2xl transition-opacity 
                    hover:text-primary hover:cursor-pointer mr-4"
                    onClick={()=>{setOpen(pv=>!pv)}}
                    />
                </>
            }
            </nav>

            <main id="main-home" className="flex w-full justify-center items-center">
                {
                    user ? 
                    <div className="w-full">
                        <header className="text-center w-full my-10 flex flex-col font-bold gap-3 justify-center items-center">
                            <h1 className="text-4xl max-sm:text-3xl">{title}</h1>
                            <h2 className="text-2xl max-sm:text-xl">{subtitle}</h2>
                        </header>
                        <div className="min-h-[600px] flex flex-col justify-center items-center w-full"> 
                            <div className="w-full">
                                {React.Children.map(children, child => {
                                    // Verifica se o elemento filho é válido antes de cloná-lo
                                    if (React.isValidElement(child)) {
                                    // Clona o elemento filho e adiciona a propriedade 'title'
                                    return React.cloneElement(child, { modalSettings, setModalSettings });
                                    }
                                    return child;
                                })}
                             </div>
                        </div>
                    </div>
                    :
                    <div className="flex w-full px-4 gap-4 h-[80vh] py-4 max-sm:flex-col-reverse max-sm:gap-8 max-sm:h-[100%]">
                        <div id='left-side' className="w-5/12 flex flex-col gap-6 justify-center items-center pl-4 max-sm:w-full">
                            <div id="header" className="flex flex-col w-full gap-4">
                                <div className="text-font font-semibold text-3xl flex max-lg:text-2xl max-sm:justify-center">
                                    <p>
                                        Mais de
                                        <span className="text-primary px-2">19.000</span>
                                        Filmes
                                    </p>
                                </div>
                                <h4 className="text-gray-200 font-semibold text-xl max-lg:text-lg max-sm:text-center">Acesse agora e comece a controlar o seu entretenimento!</h4>
                            </div>

                            <div id="body" className="flex gap-2 mt-4 w-full max-md:flex-col max-md:items-center">
                                <Link to='/login' className="max-md:w-full flex max-sm:justify-center">
                                    <button className="outline-none font-semibold bg-secondery rounded-full border w-[160px] max-md:w-2/3 py-1 px-2 border-font text-font transition-all hover:cursor-pointer hover:opacity-75">
                                        Entrar
                                    </button>
                                </Link>

                                <Link to='/register' className="max-md:w-full flex max-sm:justify-center">
                                    <button className="outline-none font-semibold bg-secondery rounded-full border w-[160px] max-md:w-2/3 py-1 px-2 border-primary text-primary transition-all hover:cursor-pointer hover:opacity-75">
                                        Registrar-se
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div id="right-side" className=" w-7/12 px-4 flex gap-1 justify-center items-center max-sm:w-full">
                            <div className="w-1/4 rounded-xl border-primary">
                                <Carousel autoplay autoplaySpeed={3500} speed={1800} pauseOnHover={false} dots={false} focusOnSelect={false} >
                                    <div>
                                        <img className="h-[400px] rounded-xl max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/bDqY2AYYdZQykEhmDr87i8RKKTT.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[400px] rounded-xl max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/11LIbjsgnshbwtxC6oLyxduboDO.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[400px] rounded-xl max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/wDWAA5QApz5L5BKfFaaj8HJCAQM.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[400px] rounded-xl max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/8tBhAn6qVRQzf5yvEcxjgPMgTkw.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[400px] rounded-xl max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/n2HcaD1dEVrwXlSFJD7GmcqHSxv.jpg'}/>
                                    </div>
                                </Carousel>
                            </div>
                            <div className="w-5/12 rounded-full border-primary">
                                <Carousel autoplay autoplaySpeed={3500} speed={1800} pauseOnHover={false} dots={false} focusOnSelect={false}>
                                    <div>
                                        <img className="h-[500px]  rounded-xl max-lg:h-[460px] max-md:h-[420px] max-sm:h-[340px]" src={'https://image.tmdb.org/t/p/w500/9EnfMH0nTPCna87Mh3G8Q6W2wze.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[500px]  rounded-xl max-lg:h-[460px] max-md:h-[420px] max-sm:h-[340px]" src={'https://image.tmdb.org/t/p/w500/jv7lyPfBC1heRWtQUd1gX7Q0wSo.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[500px]  rounded-xl max-lg:h-[460px] max-md:h-[420px] max-sm:h-[340px]" src={'https://image.tmdb.org/t/p/w500/7QsY7Jo3ZgL3pa1kdo28TA7Z6qo.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[500px]  rounded-xl max-lg:h-[460px] max-md:h-[420px] max-sm:h-[340px]" src={'https://image.tmdb.org/t/p/w500/ArDXxgsELJanwYDXd60MLTZDiSj.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[500px]  rounded-xl max-lg:h-[460px] max-md:h-[420px] max-sm:h-[340px]" src={'https://image.tmdb.org/t/p/w500/itYONYDHpJqTuu8BCXAtHxgpglq.jpg'}/>
                                    </div>
                                </Carousel>
                            </div>
                            <div className="w-1/4 rounded-xl border-primary ">
                                <Carousel autoplay autoplaySpeed={3500} speed={1800} pauseOnHover={false} dots={false} focusOnSelect={false}>
                                    <div>
                                        <img className="h-[400px] rounded-lg max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/x0naXPYoLxzTzRgwKhzAjQPngnw.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[400px] rounded-lg max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/hfSkDDJiCf6cJpd4R9O9lM1T6hz.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[400px] rounded-lg max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/2BWhcrlPr6UvSJy5D044Ikq2QxH.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[400px] rounded-lg max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/zEqwfO5R2LrrLgV61xm8M9TmNTG.jpg'}/>
                                    </div>
                                    <div>
                                        <img className="h-[400px] rounded-lg max-lg:h-[340px] max-md:h-[300px] max-sm:h-[240px]" src={'https://image.tmdb.org/t/p/w500/vvWyOCmBAND2p9UwaXZdALIDd2W.jpg'}/>
                                    </div>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                }
            </main>

            <footer className="w-full py-2 px-4 flex justify-between items-center font-semibold">
                <div className="text-sm">
                    <h3>©Desenvolvido por: Felipe K., Guilherme B., Pedro H.</h3>
                </div>
                <ul className="flex justify-center items-center gap-4 text-xl max-sm:text-base ">
                    <li 
                        className="border-[2px] border-white rounded-full px-[4px] 
                        py-[4px] flex justify-center items-center transition-all 
                        hover:text-primary hover:cursor-pointer hover:border-primary
                    ">
                        <GithubOutlined />
                    </li>
                    <li 
                        className="border-[2px] border-white rounded-full px-[4px] 
                        py-[4px] flex justify-center items-center transition-all 
                        hover:text-primary hover:cursor-pointer hover:border-primary
                    ">
                        <LinkedinFilled />
                    </li>
                    <li 
                        className="border-[2px] border-white rounded-full px-[4px] 
                        py-[4px] flex justify-center items-center transition-all 
                        hover:text-primary hover:cursor-pointer hover:border-primary"
                    >
                        <MailOutlined />
                    </li>
                </ul>
            </footer>

            <Drawer title="CineRec" placement="right" open={open} onClose={()=>{setOpen(false)}} width={'70%'} closeIcon={false}>
                <div className="flex flex-col h-[100%] justify-between py-4">
                    <ul className="flex flex-col justify-evenly w-full gap-4 items-center py-20">
                    {menuOptions.map(option=>{
                        return(
                            <Link to={option.path} key={option.id} className="w-full mx-4 text-center" onClick={()=>{setOpen(false)}}>
                                <li 
                                    className="font-semibold transition-all text-font 
                                    py-4 hover:cursor-pointer hover:text-primary w-full 
                                    text-lg border-b border-font"
                                >
                                    {option.label}
                                </li>
                            </Link>
                        )
                    })}
                    </ul>
                    <div className="w-full">
                        <button 
                            className="font-semibold transition-all hover:cursor-pointer 
                            py-2 text-red-500 border border-red-500
                            hover:border-red-700 hover:text-red-700 w-full"
                            onClick={()=>{handleLogout();setOpen(false)}}
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </Drawer>

            <MovieModal id={modalSettings.id} status={modalSettings.status} setIsModalOpen={setModalSettings} options={options} setOptions={setOptions}/>
        </div>
    )
} 

