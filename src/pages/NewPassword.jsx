import React from "react";

export const NewPassword = () => {
  return (
    <>
      <div className="h-screen w-full">
        <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
          <div className="flex  max-w-4xl rounded-lg shadow-lg shadow-primary-300 w-full sm:w-8/10 lg:w-8/10 xl:w-8/10 bg-white sm:mx-0">
            <div className="flex flex-col w-full p-6">
              <div className="flex flex-col flex-1 justify-center mb-8 mt-2">
                <h1 className="text-5xl text-center font-semibold">
                  <span className="text-4xl text-primary-600 px-1">
                    Residencia Vida Plena
                  </span>
                </h1>
                <h2 className="text-2xl text-black text-center px-1 mt-2">
                  Cambiar contraseña
                </h2>
                <div className="w-full mt-2">
                  <form className="form-horizontal w-7/10 mx-auto">
                    <div className="flex flex-col mx-auto max-w-xs mt-5">
                      <label htmlFor="password" className="mb-1 font-medium">
                        CONTRASEÑA
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="flex-grow h-10 px-2 rounded border border-grey-300"
                        name="password"
                        required
                        placeholder="Ingresar contraseña"
                      />
                    </div>

                    <div className="flex flex-col max-w-xs mt-8 mx-auto mb-5">
                      <button
                        type="submit"
                        className="bg-primary-500 hover:bg-blue-700 text-primary-50 text-sm font-semibold py-3 px-4 rounded"
                      >
                        Enviar
                      </button>
                    </div>
                  </form>
                  {/* <nav className="text-center mt-4">
                            <Link to="/" className="underline hover:font-semibold text-blue-dark text-xs">Iniciar sesión</Link> 
                          </nav> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
