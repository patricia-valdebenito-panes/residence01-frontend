import React, { useEffect, useState } from "react";
import useClient from "../hooks/useClient";
import { Alert } from "./Alert";
import { useParams } from "react-router-dom";

const optionRol = [
  { value: "RESIDENT", label: "RESIDENTE" },
  // { value: "PM", label: "PM" },
];

export const FormNewResident = () => {
  const params = useParams();
  const [existID, setExitId] = useState(null);
  const [name, setName] = useState("");
  const [lastnamemother, setLastnamemother] = useState("");
  const [lastnamefather, setLastnamefather] = useState("");
  const [rut, setRut] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [dependencyNivel, setDependencyNivel] = useState("");
  // const [rol, setRol] = useState(optionRol[0]?.label || 'RESIDENT');

  const [tutorname, setTutorName] = useState("");
  const [tutorlastnamemother, setTutorLastnamemother] = useState("");
  const [tutorlastnamefather, setTutorLastnamefather] = useState("");
  const [tutorphone, setTutorPhone] = useState("");
  const [tutoraddress, setTutorAddress] = useState("");
  const [tutorrut, setTutorRut] = useState("");

  const { alert, client, editResident, showAlert, submitResident } = useClient();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ([name].includes("")) {
      showAlert({ msg: "Debe Seleccionar un template", error: true });
      return;
    }

    if ([lastnamemother].includes("")) {
      showAlert({ msg: "Debe Seleccionar un Residente", error: true });
      //   setInformationType({ msg: "INFORMACION/EJEMPLO", read: true });
      return;
    }


    let newResident = {
      name: name,
      lastnamemother: lastnamemother,
      lastnamefather: lastnamefather,
      rut: rut,
      address: address,
      country: country,
      dependencyNivel: dependencyNivel,
      rol: "RESIDENT",
      tutor: {
        name: tutorname,
        lastnamefather: tutorlastnamemother,
        lastnamemother: tutorlastnamefather,
        phone: tutorphone,
        address: tutoraddress,
        rut: tutorrut,
      }
    }

    if (existID) {
      newResident._id= existID
      console.log("edit resident : ", newResident);
      editResident(newResident);

    } else {
      console.log("new resident : ", newResident);
      submitResident(newResident);
    }

    showAlert({});
  };





  useEffect(() => {
    const id = params.id;
    if (!id) {
      console.log("vacio");
    }
    else {
      setExitId(id)
      console.log("creado previo");
      console.log(client)
      setName(client?.name)
      setLastnamemother(client?.lastnamefather)
      setLastnamefather(client?.lastnamefather)
      setRut(client?.rut)
      setAddress(client.address)
      setCountry(client.country)
      setDependencyNivel(client.dependencyNivel)

      setTutorName(client.tutor?.name)
      setTutorLastnamefather(client.tutor?.lastnamefather)
      setTutorLastnamemother(client.tutor?.lastnamemother)
      setTutorPhone(client.tutor?.phone)
      setTutorAddress(client.tutor?.address)
      setTutorRut(client.tutor?.rut)

    }
  }, [params])

  const { msg } = alert;

  return (
    <>
      {msg && <Alert alert={alert} />}
      <form
        className="bg-white py-3 px-2 md:px-5 md:2:1/2 rounded-lg"
        onSubmit={handleSubmit}
      >
        <p className="text-zinc-950 font-bold">Información de residente:</p>
        <hr className="border-t-2 border-sky-800  my-4" />

        <div className="bg-slate-50 border-1 shadow-lg shadow-slate-400/60 rounded py-5 px-5">

          <div className="flex flex-col max-w-full mt-5">
            <label htmlFor="name" className="text-zinc-950 mb-1 font-medium">
              Nombre de residente:
            </label>
            <input
              id="name"
              type="text"
              className="flex-grow min-h-10 px-2 rounded border-gray-500 border-2"
              name="name"
              value={name}
              required
              placeholder="Ingresar Nombre"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col w-full max-w-auto md:max-w-full mt-5">
              <label
                htmlFor="lastnamemother"
                className="text-zinc-950 mb-1 font-medium"
              >
                Apellido materno:
              </label>
              <input
                id="lastnamemother"
                type="text"
                className="flex-grow min-h-10 px-2 rounded border-gray-500 border-2"
                name="lastnamemother"
                value={lastnamemother}
                required
                placeholder="Ingresar Nombre"
                onChange={(e) => setLastnamemother(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full max-w-auto md:max-w-full mt-5">
              <label
                htmlFor="lastnamefather"
                className="text-zinc-950 mb-1 font-medium"
              >
                Apellido paterno:
              </label>
              <input
                id="lastnamefather"
                type="text"
                className="flex-grow min-h-10 px-2 rounded border-gray-500 border-2"
                name="lastnamefather"
                value={lastnamefather}
                required
                placeholder="Ingresar Nombre"
                onChange={(e) => setLastnamefather(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col max-w-full mt-5">
            <label htmlFor="rut" className="text-zinc-950 mb-1 font-medium">
              Rut:
            </label>
            <input
              id="rut"
              type="text"
              className="flex-grow min-h-10 px-2 rounded border-gray-500 border-2"
              name="rut"
              value={rut}
              required
              placeholder="Ingresar Nombre"
              onChange={(e) => setRut(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col w-full max-w-auto md:max-w-full mt-5">
              <label htmlFor="address" className="text-zinc-950 mb-1 font-medium">
                Dirección:
              </label>
              <input
                id="address"
                type="text"
                className="flex-grow min-h-10 px-2 rounded border-gray-500 border-2"
                name="address"
                value={address}
                required
                placeholder="Ingresar Nombre"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full max-w-auto md:max-w-full mt-5">
              <label htmlFor="country" className="text-zinc-950 mb-1 font-medium">
                Ciudad:
              </label>
              <input
                id="country"
                type="text"
                className="flex-grow min-h-10 px-2 rounded border-gray-500 border-2"
                name="country"
                value={country}
                required
                placeholder="Ingresar Nombre"
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col max-w-full mt-5">
            <label
              htmlFor="dependencyNivel"
              className="text-zinc-950 mb-1 font-medium"
            >
              Índice de Barthel /<span className="text-sky-700 text-md font-semibold"> Nivel de depedencia  </span> :
            </label>
            <input
              id="dependencyNivel"
              type="text"
              className="flex-grow min-h-10 px-2 rounded border-gray-500 border-2"
              name="dependencyNivel"
              value={dependencyNivel}
              required
              placeholder="Ingresar Nombre"
              onChange={(e) => setDependencyNivel(e.target.value)}
            />
          </div>
          <div className="flex flex-col max-w-full mt-5">
            <label htmlFor="rol" className="text-zinc-950 mb-1 font-medium">
              Rol:
            </label>
            <input
              id="rol"
              type="text"
              className="flex-grow min-h-10 px-2 rounded border-gray-500 border-2"
              name="rol"
              value={"RESIDENT"}
              required
              defaultValue={"RESIDENT"}
              placeholder="Ingresar Nombre"
            />
          </div>

        </div>



        <br></br>
        <p className="text-zinc-950 font-bold">Información de tutor:</p>
        <hr className="border-t-2 border-sky-800  my-4" />
        <div className="bg-slate-50 border-1 shadow-lg shadow-slate-400/60 rounded py-5 px-5">
          <div className="flex flex-col max-w-full mt-5">
            <label htmlFor="tutorname" className="text-zinc-950 mb-1 font-medium">
              Nombre de tutor:
            </label>
            <input
              id="tutorname"
              type="text"
              className="flex-grow min-h-10 px-2 rounded border-gray-500 border-2"
              name="tutorname"
              value={tutorname}
              required
              placeholder="Ingresar Nombre"
              onChange={(e) => setTutorName(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col w-full max-w-44 md:max-w-full mt-5">
              <label
                htmlFor="tutorlastnamemother"
                className="text-zinc-950 mb-1 font-medium"
              >
                Apellido materno:
              </label>
              <input
                id="tutorlastnamemother"
                type="text"
                className="flex-grow min-h-10 px-2 rounded border-gray-500 border-2"
                name="tutorlastnamemother"
                value={tutorlastnamemother}
                required
                placeholder="Ingresar Nombre"
                onChange={(e) => setTutorLastnamemother(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full max-w-44 md:max-w-full mt-5">
              <label
                htmlFor="tutorlastnamefather"
                className="text-zinc-950 mb-1 font-medium"
              >
                Apellido paterno:
              </label>
              <input
                id="tutorlastnamefather"
                type="text"
                className="flex-grow min-h-10 px-2 rounded border-gray-500 border-2"
                name="tutorlastnamefather"
                value={tutorlastnamefather}
                required
                placeholder="Ingresar Nombre"
                onChange={(e) => setTutorLastnamefather(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col w-full max-w-auto md:max-w-full mt-5">
              <label
                htmlFor="tutorphone"
                className="text-zinc-950 mb-1 font-medium"
              >
                Teléfono:
              </label>
              <input
                id="tutorphone"
                type="text"
                className="flex-grow min-h-10 px-2 rounded border-gray-500 border-2"
                name="tutorphone"
                value={tutorphone}
                required
                placeholder="Ingresar teléfono"
                onChange={(e) => setTutorPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full max-w-auto md:max-w-full mt-5">
              <label htmlFor="tutorrut" className="text-zinc-950 mb-1 font-medium">
                Rut:
              </label>
              <input
                id="tutorrut"
                type="text"
                className="flex-grow min-h-10 px-2 rounded border-gray-500 border-2"
                name="tutorrut"
                value={tutorrut}
                required
                placeholder="Ingresar Nombre"
                onChange={(e) => setTutorRut(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col max-w-full mt-5">
            <label
              htmlFor="tutoraddress"
              className="text-zinc-950 mb-1 font-medium"
            >
              Dirección:
            </label>
            <input
              id="tutoraddress"
              type="text"
              className="flex-grow min-h-10 px-2 rounded border-gray-500 border-2"
              name="tutoraddress"
              value={tutoraddress}
              required
              placeholder="Ingresar Dirección"
              onChange={(e) => setTutorAddress(e.target.value)}
            />
          </div>
        </div>


        <div className="flex flex-col max-w-full mt-8 mx-auto mb-5">
          <button
            type="submit"
            className="w-full bg-sky-700 border cursor-pointer  font-semibold hover:bg-sky-800 rounded-lg  py-4 text-sky-50 text-lg  px-4 tracking-wide transition-colors uppercase"
          >
            {existID ? 'Actualizar' : ' Guardar'}
          </button>
        </div>
      </form>
    </>
  );
};
