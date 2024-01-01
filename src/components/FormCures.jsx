import React, { useState, useEffect } from "react";
import { Alert } from "./Alert";
import useTemplate from "../hooks/useTemplate";

export const FormCures = () => {
  const [observations, setOobservations] = useState("");
  const [typeCure, setTypeCure] = useState("");
  const [zone, setZone] = useState("");
  const [ulcerOrigin, setUlcerOrigin] = useState("");
  const [valorationAndEvolution, setValorationAndEvolution] = useState("");
  const [frecuencyCure, setFrecuencyCure] = useState("");
  const [cureNext, setCureNext] = useState("");
  const [responsibleForTheCure, setResponsibleForTheCure] = useState("");

  const { template, getTemplate, submitTemplate } = useTemplate();
  const { _id, creator, client } = template;

  useEffect(() => {
    const value = localStorage.getItem("new-template").split(",")[1];
    const getValue = async () => {
      await getTemplate(value);
      try {
        console.log("si pasa");
      } catch (error) {
        console.log(error);
      }
    };
    getValue();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRegister = {
      client: client,
      template: _id,
      creator: creator,

      Obs: observations,
      typeCure: typeCure,
      zone: zone,
      UlcerOrigin: ulcerOrigin,
      valorationAndEvolution: valorationAndEvolution,
      frecuencyCure: frecuencyCure,
      cureNext: cureNext,
      responsibleForTheCure: responsibleForTheCure,
    };
    submitTemplate(newRegister, "curaciones");
  };
  // const { msg } = alert;
  // console.log("msg :", msg);
  return (
    <>
      {/* {msg && <Alert alert={alert} />} */}
      <p className="text-3xl text-sky-950 font-medium px-1">
        Registro de Curaciones:
        <span className="text-xl text-cyan-800 mt-2 font-medium block">Paso 2:</span>
      </p>
      <form
        className="bg-white py-3 px-1 md:px-5 md:2:1/2 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col mx-auto max-w-xs mt-1">
          <label htmlFor="typeCure" className="text-zinc-950 mb-1 font-medium">
            Tipo de Curación:
          </label>
          <input
            id="typeCure"
            type="text"
            className="flex-grow min-h-10 px-2 rounded border border-gray-500"
            name="typeCure"
            value={typeCure}
            required
            placeholder="Ingresar de curación"
            onChange={(e) => setTypeCure(e.target.value)}
          />
        </div>
        <div className="flex flex-col mx-auto max-w-xs mt-5">
          <label htmlFor="zone" className="text-zinc-950 mb-1 font-medium">
            Zona:
          </label>
          <input
            id="zone"
            type="text"
            className="flex-grow min-h-20 px-2 rounded border border-gray-500"
            name="zone"
            value={zone}
            required
            placeholder="Ingresar Zona"
            onChange={(e) => setZone(e.target.value)}
          />
        </div>
        <div className="flex flex-col mx-auto max-w-xs mt-5">
          <label
            htmlFor="ulcerOrigin"
            className="text-zinc-950 mb-1 font-medium"
          >
            Origen de la Úlcera:
          </label>
          <input
            id="ulcerOrigin"
            type="text"
            className="flex-grow min-h-20 px-2 rounded border border-gray-500"
            name="ulcerOrigin"
            value={ulcerOrigin}
            required
            placeholder="Ingresar Origen de la Úlcera"
            onChange={(e) => setUlcerOrigin(e.target.value)}
          />
        </div>
        <div className="flex flex-col mx-auto max-w-xs mt-5">
          <label
            htmlFor="valorationAndEvolution"
            className="text-zinc-950 mb-1 font-medium"
          >
            Valoración y Evolución(%):
          </label>
          <input
            id="valorationAndEvolution"
            type="number" // Cambiado a un campo de entrada de rango
            min="1"
            max="100"
            step="1"
            className="flex-grow min-h-10 px-2 rounded border border-gray-500"
            name="valorationAndEvolution"
            value={valorationAndEvolution}
            required
            placeholder="0%"
            onChange={(e) => setValorationAndEvolution(e.target.value)}
          />
        </div>
        <div className="flex flex-col mx-auto max-w-xs mt-5">
          <label
            htmlFor="frecuencyCure"
            className="text-zinc-950 mb-1 font-medium"
          >
            Frecuencia de Curaciones:
          </label>
          <input
            id="frecuencyCure"
            type="text"
            className="flex-grow min-h-10 px-2 rounded border border-gray-500"
            name="frecuencyCure"
            value={frecuencyCure}
            required
            placeholder="Ingresar Frecuencia de Curación"
            onChange={(e) => setFrecuencyCure(e.target.value)}
          />
        </div>
        <div className="flex flex-col mx-auto max-w-xs mt-5">
          <label htmlFor="cureNext" className="text-zinc-950 mb-1 font-medium">
            Próxima Cura:
          </label>
          <input
            id="cureNext"
            type="date"
            className="flex-grow min-h-10 px-2 rounded border border-gray-500"
            name="cureNext"
            value={cureNext}
            required
            onChange={(e) => setCureNext(e.target.value)}
          />
        </div>
        <div className="flex flex-col mx-auto max-w-xs mt-5">
          <label
            htmlFor="responsibleForTheCure"
            className="text-zinc-950 mb-1 font-medium"
          >
            Responsable de la Curación:
          </label>
          <input
            id="responsibleForTheCure"
            type="text"
            className="flex-grow min-h-20 px-2 rounded border border-gray-500"
            name="responsibleForTheCure"
            value={responsibleForTheCure}
            required
            placeholder="Ingresar Responsable"
            onChange={(e) => setResponsibleForTheCure(e.target.value)}
          />
        </div>
        <div className="flex flex-col mx-auto max-w-xs mt-5">
          <label
            htmlFor="observations"
            className="text-zinc-950 mb-1 font-medium"
          >
            OBSERVACIONES:
          </label>
          <input
            id="observations"
            type="text"
            className="flex-grow min-h-48 px-2 rounded border border-gray-500"
            name="observations"
            value={observations}
            required
            placeholder="Ingresar observaciones"
            onChange={(e) => setOobservations(e.target.value)}
          />
        </div>
        <div className="flex flex-col max-w-xs mt-8 mx-auto mb-5">
          <button
            type="submit"
            className="w-full bg-sky-700 border cursor-pointer  font-semibold hover:bg-sky-800 rounded-lg  py-4 text-sky-50 text-lg  px-4 tracking-wide transition-colors uppercase"
          >
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};
