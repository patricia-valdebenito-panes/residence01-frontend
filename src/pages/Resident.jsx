import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useClient from "../hooks/useClient";
import useAuth from "../hooks/useAuth";
import html2pdf from "html2pdf.js";

export const Resident = () => {
  const params = useParams();
  const datetoday = new Date();
  const { client, getClient } = useClient();

  const { auth } = useAuth();
  const { rol } = auth;
  console.log("rol", rol);
  const [moreInfoTutor, setMoreInfoTutor] = useState(false);
  // const [editPerfil, setEditPerfil] = useState(false);
  const navigate = useNavigate();

  const handleInformationTutor = (e) => {
    e.preventDefault();
    setMoreInfoTutor(!moreInfoTutor);
  };

  const handleEditInformation = (e) => {
    e.preventDefault();

    navigate(`/residentes/editar-residente/${client._id}`);
  };

  const exportToPdf = () => {
   
    const paramsDate = datetoday.getDate() + "-" + (datetoday.getMonth() + 1);
    const element = document?.getElementById("residentInfo"); // Reemplaza 'residentInfo' con el ID de tu contenedor de información
    const options = {
      filename: `perfil-${client.name}-${client.lastnamefather}-${paramsDate}.pdf`, // Configura el nombre del archivo aquí
      jsPDF: {
        unit: "pt",
        format: "a4",
        orientation: "portrait",
        putOnlyUsedFonts: true,
        font: "times",
      },
      margin: 40, // Márgenes en puntos, 1 pulgada = 72 puntos
    };
  
    // Configura el ancho del contenedor según tus necesidades (por ejemplo, 800px)
    if (element) {
      element.style.width = "100%"; // Ajusta el ancho según tus necesidades
      element.style.fontSize = "12px"; // Establece el tamaño de fuente a 12 puntos
  
      // Oculta el enlace de "Llamar al Tutor" antes de exportar
      const callTutorLink = element.querySelector("a[href='tel:+']");
      if (callTutorLink) {
        callTutorLink.style.display = "none";
      }
    }
  
    html2pdf(element, options);
  
    // Restaura la visibilidad del enlace después de exportar (si es necesario)
    if (element) {
      const callTutorLink = element.querySelector("a[href='tel:+']");
      if (callTutorLink) {
        callTutorLink.style.display = "block"; // O el valor que tenia originalmente
      }
    }
  };
  

  useEffect(() => {
    const dataTC = async () => {
      getClient(params.id);
      console.log(client);
    };

    dataTC();
  }, []);

  return (
    <>
      {client ? (
        <div className="p-4 relative max-w-dm w-full lg:max-w-4xl lg:flex border-b border-l  border-r border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-r">
          <div className="block absolute top-1 right-4">
            <p className="" onClick={handleEditInformation}>
              {" "}
              Editar
            </p>
            <p
              onClick={exportToPdf}
              className="underline text-sm text-gray-800 pr-2"
            >
              Exportar perfil PDF
            </p>
          </div>

          <div
            className="p-4 justify-between max-w-lg leading-normal border-gray-300 border"
            id="residentInfo"
          >
            <div className="mb-8">
              <div className="h-auto w-auto max-w-[500px] min-w-[400px] bg-gray-100 mb-4 p-2 text-center overflow-hidden">
                {" "}
                <p className="font-bold text-lg text-start text-gray-700 pr-2">
                  Perfil de Residente
                </p>
        
              </div>
              <p className="flex items-center text-xl text-gray-600 capitalize py-2">
                <span className="font-bold text-lg text-gray-700 pr-2">
                  Nombre:{" "}
                </span>
                {client.name}
              </p>
              <p className="flex items-center text-xl text-gray-600 capitalize py-2">
                <span className="font-bold text-lg text-gray-700 pr-2">
                  {" "}
                  Apellidos :{" "}
                </span>{" "}
                {`${client.lastnamemother} ${client.lastnamefather}`}
              </p>
              <p className="flex items-center text-xl text-gray-600 capitalize py-2">
                <span className="font-bold text-lg text-gray-700 pr-2">
                  {" "}
                  RUT :{" "}
                </span>{" "}
                {client.rut}
              </p>
              <p className="flex items-center text-xl text-gray-600 capitalize py-2">
                <span className="font-bold text-lg text-gray-700 pr-2">
                  {" "}
                  Dependency Nivel:{" "}
                </span>{" "}
                {client.dependencyNivel}
              </p>
            </div>
            <div className="w-full flex items-center">
              {/* <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink" /> */}
              <div className="w-full text-sm">
                <p className="text-gray-900 leading-none">
                  <span className="font-bold">Address:</span> {client.address},{" "}
                  {client.country}
                </p>
                {/* <p className="text-gray-600">Aug 18</p> */}
                <button
                  className="mt-5 mb-5 text-md text-gray-800 underline"
                  onClick={handleInformationTutor}
                >
                  Ver información de Tutor
                </button>
                {moreInfoTutor && (
                  <div className="relative ">
                    <hr className="border-t-1 border-sky-200  my-2" />
                    {/* HTML para llamar al tutor  */}
                    <a
                      className="absolute top-1 right-4"
                      href={`tel:+${client.phone}`}
                    >
                      Llamar al Tutor
                    </a>
                    <p className="mt-3 text-gray-700 text-base">
                      <span className="font-bold">Nombre Tutor:</span>{" "}
                      {client.name} {client.lastnamefather}{" "}
                      {client.lastnamemother}
                    </p>
                    <p className="text-gray-700 text-base">
                      <span className="font-bold">Teléfono:</span>{" "}
                      {client.phone}
                    </p>
                    <p className="text-gray-700 text-base">
                      <span className="font-bold">Dirección:</span> {client.rut}
                    </p>
                    <p className="text-gray-700 text-base">
                      <span className="font-bold">RUT:</span> {client.address}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text text-center text-gray-600">cargando...</p>
      )}
    </>
  );
};
