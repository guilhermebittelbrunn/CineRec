import {Routes, Route} from 'react-router-dom'
import PriveteRoute from './components/PrivateRoute'
import CustomRoute from './components/CustomRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import Main from './pages/sub-pages/Main'
import Search from './pages/sub-pages/Search'
import Profile from './pages/sub-pages/Profile'
import Lists from './pages/sub-pages/Lists'

export default function Router(){
    return(
        <Routes>
            <Route path='/login' element={<CustomRoute><Login/></CustomRoute>}/>
            <Route path='/register' element={<CustomRoute><Register/></CustomRoute>}/>
            <Route path='/' element={<Home title='Home' subtitle='Explore filmes diversos'><Main/></Home>}/>  
            <Route path='/lists' element={<PriveteRoute><Home title='Minhas Listas' subtitle='Explore e crie novas listas'><Lists/></Home></PriveteRoute>}/>  
            <Route path='/search' element={<PriveteRoute><Home title='Buscar' subtitle='Busque pelos seus filmes favoritos'><Search/></Home></PriveteRoute>}/>  
            <Route path='/profile' element={<PriveteRoute><Home title='Perfil' subtitle=''><Profile/></Home></PriveteRoute>}/>  
            <Route path='*' element={<PageNotFound/>}/>  
        </Routes>
    )
}