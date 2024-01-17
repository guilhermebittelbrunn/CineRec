import {ConfigProvider} from 'antd'
import { BrowserRouter } from 'react-router-dom'
import pt_BR from 'antd/locale/pt_BR'
import UserProvider from './context/UserContext'
import MovieProvider from './context/MovieListsContext'
import Router from './Router'


const selectStyle = {
    selectorBg: '#171717',
    colorTextPlaceholder: '#9ca3af',
    optionSelectedBg: '#09B54E',
    colorText:'#FAFAFA'
}

const inputStyle = {
   selectorBg: '#171717',  
   colorTextPlaceholder: '#9ca3af', 
   optionSelectedBg: '#09B54E',  
   colorText:'#FAFAFA', 
   backgroundColor:'#171717'
}

const tokeStyle = {
    colorPrimary: '#09B54E',
    colorText: '#FAFAFA',
    colorBgBase: '#171717'
}


export default function App(){
    return(
      <div className="text-font">
        <BrowserRouter>
          <ConfigProvider locale={pt_BR} theme={{components:{Select: selectStyle, Input: inputStyle}, token:tokeStyle}}>
            <UserProvider>
              <MovieProvider>
              <Router/>
              </MovieProvider>
            </UserProvider>
          </ConfigProvider>
        </BrowserRouter>
      </div>
    )
}
