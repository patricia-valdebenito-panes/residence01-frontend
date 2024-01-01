import React, { useEffect, useState } from "react";
import { Alert } from "../components/Alert";
import { FormNewResident } from "../components/FormNewResident";
import { useParams } from "react-router-dom";


export const NewResident = () => {

  const [alert, setAlert] = useState({});  
  // const [informationType, setInformationType] = useState("");
  const params = useParams();


  return (
    <>
    {/* Incluir Pasos */}

        <div className="flex px-1 md:px-4">
       <div className="flex flex-col max-w-full px-2 py-6 xl:w-2/3 md:p-6">
              {alert.msg && <Alert alert={alert} />}
              <div className="flex flex-col flex-1 justify-center mb-8 mt-2">
                <p className="text-3xl text-sky-950 font-medium px-1">
             NUEVO RESIDENTE
             <span className="text-xl text-sky-800 font-medium block">Paso 1:</span>
                </p>
                <div className="w-full mt-2">
                   <FormNewResident 
                    setAlert={setAlert}
                    />
                </div>
              </div>
            </div>
        </div>
    </>
  );
};
