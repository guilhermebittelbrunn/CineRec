import { Link } from 'react-router-dom';
import { MailOutlined, KeyOutlined} from '@ant-design/icons'
import { useForm } from 'react-hook-form'
import { UserContext } from '../context/UserContext';
import { useContext,  } from 'react';

export default function Login(){
    const {handleSubmit, register} = useForm();
    const {handleLogin} = useContext(UserContext);
    
    return(
        <div className='w-full max-w-5xl m-auto py-2 flex justify-center items-center absolute top-2/4 left-2/4 transform translate-x-[-50%] translate-y-[-50%]'>
              <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col justify-center items-center w-full'>
                        <div className='px-4 flex flex-col justify-center items-center gap-4 w-full'>
                            
                            <h1 className='font-bold text-xl text-font'>Acesse sua conta</h1>  
                            <div className='border-[1.5px] mb-2 bg-secondery gap-4 px-8 py-8 border-primary flex flex-col justify-center items-center rounded-lg max-w-[400px] w-full lg:w-[38%]'>
                                    
                                    <div className='flex px-2 py-1 border-[1px] rounded-md border-primary bg-secondery text-font w-full'>
                                        <div className='w-[24px] mr-[10px] text-primary flex justify-center items-center'>
                                            <MailOutlined />
                                        </div>
                                        <input 
                                            type='email' {...register('email')} placeholder='E-mail' 
                                            className='bg-secondery outline-none text-font border-hidden w-full text-lg'
                                        />
                                    </div>

                                    <div className='flex px-2 py-1 border-[1px] rounded-md border-primary bg-secondery text-font w-full'>
                                        <div className='w-[24px] mr-[10px] text-primary flex justify-center items-center'>
                                            <KeyOutlined className='rotate-180'/>
                                        </div>
                                        <input 
                                            type='password' {...register('password')} placeholder='Senha' 
                                            className='bg-secondery outline-none text-font border-hidden w-full text-lg'
                                        />
                                    </div>

                                    <div className='flex flex-col w-full justify-center items-center gap-3 mt-1'>
                                        <button 
                                            type='submit' className='w-4/5 bg-primary mt-2 border-hidden 
                                            text-font py-2 rounded-md hover:bg-green-600 hover:text-font text-lg font-semibold'
                                        >
                                           Entrar
                                        </button>
                                        <Link to='/register' className='text-base text-font opacity-80 
                                            text-center hover:opacity-100 hover:cursor-pointer'
                                        >
                                            Não possui conta? Cadastre-se aqui
                                        </Link>
                                    </div>
                            </div>
                        </div>
                    </form>
        </div>
    )
}