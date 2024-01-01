import React, { useState, useEffect } from "react";
import { Select } from "./Select";
import useAuth from "../hooks/useAuth";
import { Alert } from "./Alert";
import useTemplate from "../hooks/useTemplate";

const optionPC = [
  { value: "AM", label: "AM" },
  { value: "PM", label: "PM" },
];
export const FormChangePosition = () => {
  const [pc, setPC] = useState("");
  const [observations, setOobservations] = useState("");

  const { template, getTemplate, submitTemplate } = useTemplate();
  const { _id, creator, client } = template;

  const handleSelectPC = (event) => {
    event.preventDefault();
    setPC(event.target.value);
  };

  useEffect(() => {
    const value = localStorage.getItem("new-template").split(",")[1];
    const getValue = async () => {
      await getTemplate(value);
      try {
        console.log("si pasa");
      } catch (error) {
        console.log("no pasa");
      }
    };
    getValue();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRegister = {
      client: client,
      PC: pc,
      template: _id,
      creator: creator,
      Obs: observations,
    };
    submitTemplate(newRegister, "cambios-de-posicion");
  };
  // const { msg } = alert;
  // console.log("msg :", msg);
  return (
    <>
      {/* {msg && <Alert alert={alert} />} */}
      <p className="text-3xl text-sky-950 font-medium px-1">
        Registro de Cambio de posición:
        <span className="text-xl text-cyan-800 mt-2 font-medium block">Paso 2:</span>
      </p>
      <form
        className="bg-white py-5 px-5 md:2:1/2 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col max-w-xs mx-auto mt-5">
          <Select
            label={"PC"}
            values={optionPC}
            selectedValue={pc}
            onChange={handleSelectPC}
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
            className="flex-grow min-h-24 px-2 rounded border border-gray-500"
            name="observations"
            value={observations}
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
