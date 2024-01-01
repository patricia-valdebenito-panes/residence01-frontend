import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Alert } from "../components/Alert";
import ClientAxios from '../config/ClientAxios';

export const ConfirmeAccount = () => {
    const params = useParams();
    const { id } = params;
    const [alert, setAlert] = useState({});
    const [msgConfirmated, setMsgConfirmated] = useState(false);

    useEffect(() => {
        
      const confirmatedAccount = async () => {
        const response = await ClientAxios(`/users/confirm/${id}`);

        try{
            setAlert({
                msg:response.data.msg,
                error:false
            })
            setMsgConfirmated(true);
        }catch(error){
            console.log("Error",error);
        }
      }
      
      confirmatedAccount();
    }, [])
    
    const { msg } = alert;
    

    return (<>
      <div className="h-screen w-full">
        <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
          <div className="flex max-w-5xl rounded-lg shadow-lg shadow-primary-300 w-full sm:w-8/10 lg:w-8/10 xl:w-8/10 bg-zinc-100 sm:mx-0">
            <div className="flex flex-col w-full p-6">
                  <div className="flex flex-col flex-1 justify-center mb-4 mt-2">
                      <h1 className="text-5xl text-center text-gray-800 font-bold leading-10">
                          Confirmar cuenta 
                          <br /> 
                          <span className="text-3xl text-sky-800 px-1">Residencia Vida Plena</span>
                          </h1>
                          <div className="w-full max-w-[500px] mb-4 mt-8 mx-auto text-center">
                              { msg && <Alert alert={alert}/>}
                             
                              { msgConfirmated &&
                                <Link 
                                to="/"
                                className='bg-sky-700 border rounded-lg hover:bg-blue-700 text-sky-50 text-sm font-semibold mx-auto py-3 px-4'>Iniciar Sesión</Link>
                              }
                          </div>
                  </div>
              </div>
             
          </div>
      </div>
  </div>
</>);
}
