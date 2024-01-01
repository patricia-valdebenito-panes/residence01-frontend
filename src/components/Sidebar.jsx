import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const name = "Karine";
  return (
    <aside className="md:min-h-80 py-4 border-l-2 border-gray-200 bg-slate-50 md:w-80 lg:w-96 px-5">
      <p className="text-xl font-bold mb-6 mt-3 md:mb-8 md:mt-5">Hola {name}</p>

      <Link
        to="/templates/nuevo-template"
        className="w-full bg-sky-600 hover:font-semibold text-center text-white uppercase rounded-lg mt-4 p-4 block"
      >
        Nueva Planilla
      </Link>

      <Link
        to="/residentes/nuevo-residente"
        className="w-full bg-sky-600 hover:font-semibold text-center text-white uppercase rounded-lg mt-4 p-4 block"
      >
        Nuevo Residente
      </Link>
    </aside>
  );
};
