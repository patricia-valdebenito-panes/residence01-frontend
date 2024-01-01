import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Alert } from "../components/Alert";

import ClientAxios from "../config/ClientAxios";

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const [alert, setAlert] = useState({});
  
  const handleReset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRol('');
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      // if([name,email,password,rol].includes('')){
      //   setAlert({ msg:'Completar Campos Incompletos.',error:true });
      //   return
      // }
      if([name].includes('')){
        setAlert({ msg:'Debe ingresar un Nombre', error:true });
        return
      }
      if([email].includes('')){
        setAlert({ msg:'Debe ingresar un Email Válido.', error:true });
        return
      }
      if([password].includes('')){
        setAlert({ msg:'Debe ingresar una Contraseña.', error:true });
        return
      }
      if([rol].includes('')){
        setAlert({ msg:'Debe seleccionar un Rol.', error:true });
        return
      }

     setAlert({});

     try{
        const { data } = await ClientAxios.post(`/users`,{name,email,password,rol});
        console.log("respuesta :",data);
        setAlert({ msg:data.msg, error:false });
        handleReset();
      }catch(error){
        const { data, status } = error.response;
        setAlert({ msg:data.msg, error:true });
        console.log(data, status);
     }

  }

  return (
    <>
      <div className="h-screen w-full">
        <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
          <div className="flex max-w-5xl rounded-lg shadow-lg shadow-primary-300 w-full sm:w-8/10 lg:w-8/10 xl:w-8/10 bg-zinc-100 sm:mx-0">
            <div className="flex flex-col w-full  md:w-1/2 p-6">
             { alert.msg && <Alert alert={alert}/>}
              <div className="flex flex-col flex-1 justify-center mb-8 mt-2">
                     <p className="text-3xl text-sky-950 font-medium mx-auto px-1">
                        REGISTRAR USUARIO
                        <span className="block text-lg text-center text-sky-500 font-medium mx-auto px-1">Administradores y Cuidadores</span>
                      </p>
                <div className="w-full mt-2">
                  <form 
                  className="form-horizontal w-7/10 mx-auto"
                  onSubmit={handleSubmit}>
                    <div className="flex flex-col max-w-xs mx-auto mt-5">
                      <label htmlFor="name" className="text-zinc-950 mb-1 font-medium">
                        NOMBRE
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="flex-grow h-10 px-2 border rounded border-grey-200"
                        name="name"
                        value={name}
                        required
                        placeholder="Ingresar email"
                        onChange={e=>setName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col max-w-xs mx-auto mt-5">
                      <label htmlFor="email" className="text-zinc-950 mb-1 font-medium ">
                        EMAIL
                      </label>
                      <input
                        id="email"
                        type="text"
                        className="flex-grow h-10 px-2 border rounded border-grey-200"
                        name="email"
                        value={email}
                        required
                        placeholder="Ingresar email"
                        onChange={e=>setEmail(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-auto max-w-xs mt-5">
                      <label htmlFor="password" className="text-zinc-950 mb-1 font-medium">
                        CONTRASEÑA
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="flex-grow h-10 px-2 rounded border border-grey-300"
                        name="password"
                        value={password}
                        required
                        placeholder="Ingresar contraseña"
                        onChange={e=>setPassword(e.target.value)}
                      />
                    </div>

                    <div className="w-full mt-4 mx-auto max-w-xs">
                      <label
                        htmlFor="rol"
                        className="block mb-2 text-base font-medium text-zinc-950"
                      >ROL </label>

                      <select
                        id="rol"
                        value={rol}
                        onChange={e => setRol(e.target.value)} 
                        className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Seleccionar Rol</option>
                        <option value="SUPERADMIN">ADMINISTRADOR</option>
                        <option value="CAREGIVEN">CUIDADOR</option>
                      </select>
                    </div>
                    <div className="flex flex-col max-w-xs mt-8 mx-auto mb-5">
                      <button
                        type="submit"
                        className="bg-sky-700 border rounded-lg hover:bg-blue-700 text-sky-50 text-sm font-semibold py-3 px-4"
                      >
                        REGISTRAR
                      </button>
                    </div>
                  </form>
                  <nav className="text-center mt-4">
                    <Link
                      to="/"
                      className="underline text-blue-dark hove:font-semibold text-xs mt-4">
                     Iniciar sesión
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center md:w-1/2 rounded-r-lg bg-sky-600">
                <h1 className="text-6xl text-center text-sky-50 font-semibold">
                      Bienvenido
                      <br />
                      <span className="text-4xl text-cyan-200 drop-shadow-xl shadow-cyan-900/95 px-1">
                        Residencia Vida Plena
                      </span>
                    </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
