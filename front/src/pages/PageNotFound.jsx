import { Link } from "react-router-dom";
import { Button } from "antd";

export default function PageNotFound(){
    return(
        <main className="w-full h-screen flex justify-center items-center flex-col gap-6">
            <h2 className="text-primary font-bold text-xl text-center">Erro 404 - Página não encontrada</h2>
            <Link to={'/'} className="">
                <button className="text-lg text-blue-400 underline transition-all hover:text-blue-500">Ir para página inicial</button>
            </Link>
        </main>
    )
}