import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";

import ClientAxios from "../config/ClientAxios";
import useAuth from "../hooks/useAuth";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const { setAuth } = useAuth();
  
  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if([name,email,password,rol].includes('')){
    //   setAlert({ msg:'Completar Campos Incompletos.',error:true });
    //   return
    // }
    if ([email].includes("")) {
      setAlert({ msg: "Debe ingresar un Email Válido.", error: true });
      return;
    }

    if ([password].includes("")) {
      setAlert({ msg: "Debe ingresar una Contraseña.", error: true });
      return;
    }
    const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!regEx.test(email)) {
      setAlert({ msg: "Ingresa un correo válido.", error: true });
      return;
    }

    setAlert({});

    try {
      const { data } = await ClientAxios.post(`/users/login`,{ email, password });
      console.log("respuesta :", data);

      setAlert({ msg: data.msg, error: false });
      setAuth(data);
      localStorage.setItem('token',data.token);
      handleReset();
      navigate('/templates');

    } catch (error) {
      const { data, status } = error.response;
      setAlert({ msg: data.msg, error: true });
      console.log(data, status);
    }
  };
  return (
    <>
      <div className="h-screen w-full">
        <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
          <div className="flex max-w-5xl rounded-lg shadow-lg shadow-primary-300 w-full sm:w-8/10 lg:w-8/10 xl:w-8/10 bg-zinc-100 sm:mx-0">
            <div className="flex flex-col w-full  md:w-1/2 p-6">
              {alert.msg && <Alert alert={alert} />}
              <div className="flex flex-col flex-1 justify-center mb-8 mt-2">
                <p className="text-3xl text-sky-950 font-medium mx-auto px-1">
                  INICIO DE SESIÓN
                </p>

                <div className="w-full mt-4">
                  <form
                    className="form-horizontal w-7/10 mx-auto"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col max-w-xs mx-auto mt-5">
                      <label
                        htmlFor="email"
                        className="text-zinc-950 mb-1 font-medium "
                      >
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
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col mx-auto max-w-xs mt-5">
                      <label
                        htmlFor="password"
                        className="text-zinc-950 mb-1 font-medium"
                      >
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
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col max-w-xs mt-8 mx-auto mb-5">
                      <button
                       type="submit"
                       className="bg-sky-700 border rounded-lg hover:bg-blue-700 text-sky-50 text-sm font-semibold py-3 px-4"
                     >
                        INGRESAR
                      </button>
                    </div>
                  </form>
                  <nav className="text-center mt-4">
                    <Link
                      to="nueva-password"
                      className="underline hover:font-semibold text-blue-dark text-xs"
                    >
                      Olvide mi contraseña
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
