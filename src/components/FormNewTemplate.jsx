import React, { useState } from "react";
import { Select } from "./Select";
import useClient from "../hooks/useClient";
import { Alert } from "./Alert";
import useAuth from "../hooks/useAuth";
import useTemplate from "../hooks/useTemplate";

const templates = [
  {'value':'CT2','label':'Cambio de Posición' },
  {'value':'CT3','label':'Curaciones' },
  {'value':'CT4','label':'Vacunas' },
  {'value':'CT5','label':'Visita Médica' },
  {'value':'CT6','label':'Signos Vitales' },
  {'value':'CT7','label':'otro' },
]
export const FormNewTemplate = () => {
  const [client, setClient] = useState("");
  const [type, setType] = useState("");

  const { clients } = useClient();
  const { alert, showAlert, submitNewTemplate } = useTemplate();
  const { auth } = useAuth();

  const handleSelectTemplateChange = (event) => {
    event.preventDefault();
    setType(event.target.value);
  };

  const handleSelectResidentChange = (event) => {
    event.preventDefault();
    setClient(event.target.value);
  };

  const transformedClients = clients?.map((client) => ({
      value: client._id,
      label: client.name,
    }));

   
    const searchClient = (value) => clients?.filter((client) => client._id === value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ([type].includes("")) {
      showAlert({ msg: "Debe Seleccionar un template", error: true });
      return;
    }

    if ([client].includes("")) {
      showAlert({ msg: "Debe Seleccionar un Residente", error: true });
      //   setInformationType({ msg: "INFORMACION/EJEMPLO", read: true });
      return;
    }

    // datos a provider templates
    submitNewTemplate({ creador: auth._id,name:searchClient(client)[0].name,client, type });
    showAlert({});

  };
  const { msg } = alert;

  return (
    <>
      <p className="text-3xl text-sky-950 font-medium px-1">
             NUEVO TEMPLATE
             <span className="text-xl text-cyan-800 mt-2 font-medium block">Paso 1:</span>
                </p>
      {msg && <Alert alert={alert} />}
      
      <form
        className="bg-white py-3 px-2 md:px-5 md:2:1/2 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col max-w-xs mx-auto mt-5">
          <Select
            label={"residentes"}
            values={transformedClients}
            // value={[]}
            selectedValue={client}
            onChange={handleSelectResidentChange}
          />
        </div>
        <div className="w-full mt-4 mx-auto max-w-xs">
          <Select
            label={"templates"}
            values={templates}
            selectedValue={type}
            onChange={handleSelectTemplateChange}
          />
        </div>

        <div className="flex flex-col max-w-xs mt-8 mx-auto mb-5">
          <button
            type="submit"
            className="w-full bg-sky-700 border cursor-pointer  font-semibold hover:bg-sky-800 rounded-lg  py-4 text-sky-50 text-lg  px-4 tracking-wide transition-colors uppercase"
          >Continuar
          </button>
        </div>
      </form> 
    </>
  );
};
