import React, { useState, useEffect } from "react";
import { Select } from "./Select";
import useAuth from "../hooks/useAuth";
import { Alert } from "./Alert";
import useTemplate from "../hooks/useTemplate";


const VPred = [
  { value: "Antirrabica", label: "Antirrabica" },
  { value: "Complejo Vit. B12 (Neurobionta)", label: "Complejo Vit. B12 (Neurobionta)" },
  { value: "Covid", label: "Covid" },
  { value: "Influenza", label: "Influenza" },
  { value: "Neumococica", label: "Neumocócica" }
];


export const FormVaccines = () => {
  const [name, setName] = useState("");
  const [VaccinesPred, setVaccinesPrede] = useState("");
  const [listVacunas, setListVacunas] = useState("");

  const [typeVaccines, setTypeVaccines] = useState("");
  const [observations, setOobservations] = useState("");
  const [cureNext, setCureNext] = useState("");
  const { template, getTemplate, submitTemplate } = useTemplate();
  const { _id, creator, client } = template;

  const handleSelectPC = (event) => {
    event.preventDefault();
    setVaccinesPrede(event.target.value);
  };

  const agregarVacuna = (e) => {
    e.preventDefault();
    setListVacunas([...listVacunas, name])
  }


  const handleSubmit = (event) => {

    event.preventDefault();

    const newRegister = {
      client: client,
      template: _id,
      creator: creator,
      name: listVacunas,
      clasificationVaccine: typeVaccines,
      applyNext: cureNext,
      Obs: observations,
    };

    submitTemplate(newRegister, "vacunas");
  };

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
  // const { msg } = alert;
  // console.log("msg :", msg);
  return (
    <>

      {/* {msg && <Alert alert={alert} />} */}
      <p className="text-3xl text-sky-950 font-medium px-1">
        Registro de Vacunas:
        <span className="text-xl text-cyan-800 mt-2 font-medium block">Paso 2:</span>
      </p>
      <form
        className="bg-white py-5 px-5 md:2:1/2 rounded-lg"
        onSubmit={handleSubmit}
      >

        <div className="flex flex-col mx-auto max-w-xs mt-1">
          <Select
            label={"Seleccionar Vacuna(s)"}
            values={VPred}
            selectedValue={VaccinesPred}
            onChange={handleSelectPC}
          />
          <hr className="border-t-2 border-sky-800  my-4" />
          <input
            id="name"
            type="text"
            className="flex-grow inline-block min-h-10 px-2 rounded border-gray-500 border-2"
            name="name"
            value={name}
            required
            placeholder="Ingresar vacuna"
            onChange={(e) => setName(e.target.value)}
          />

          <button
            type="button"
            className="my-4 inline-block w-50 bg-sky-700 border cursor-pointer rounded-lg hover:bg-sky-800 text-sky-50 text-sm font-semibold py-3 px-4 transition-colors"
            onClick={agregarVacuna}>Agregar</button>

          Lista de vacunas ingresadas:
          <ul role="list" className="marker:text-sky-500 min-h-24 list-disc pl-5 space-y-4">
            {
              listVacunas.length ? listVacunas.map((e, i) => {
                return(<li 
                  key={`date-${i}`}
                  className="py-3"
                  >{e}</li>)
              }):""
            }

          </ul>


        </div>

        <div className="flex flex-col mx-auto max-w-xs mt-5">
          <label
            htmlFor="typeVaccines"
            className="text-zinc-950 mb-1 font-medium"
          >
            Tipo de vacuna:
          </label>
          <input
            id="type"
            type="text"
            className="flex-grow min-h-10 px-2 rounded border-gray-500 border-2"
            name="typeVaccines"
            value={typeVaccines}
            required
            placeholder="Ingresar tipo"
            onChange={(e) => setTypeVaccines(e.target.value)}
          />
        </div>
        <div className="flex flex-col mx-auto max-w-xs mt-5">
          <label htmlFor="cureNext" className="text-zinc-950 mb-1 font-medium">
            Próxima Vacuna:
          </label>
          <input
            id="cureNext"
            type="date"
            className="flex-grow min-h-10 px-2 rounded border-gray-500 border-2"
            name="cureNext"
            value={cureNext}
            onChange={(e) => setCureNext(e.target.value)}
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
            className="flex-grow min-h-48 px-2 rounded border-gray-500 border-2"
            name="observations"
            value={observations}
            required
            placeholder="Ingresar Observaciones"
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
