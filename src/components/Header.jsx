import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-white-100 border-b p-3 lg:px-5 lg:py-6">
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <h2 className="text-2xl text-center text-sky-900 leading-6 mb-2 md:mb-0">
          Residencia <br />
          <small className="text-md text-sky-600 font-bold leading-7">Vida Plena</small>
        </h2>
        <div className="flex items-center gap-4">
          <Link
            to="/templates"
            className="text-sky-600 hover:underline hover:text-sky-700 focus:outline-none focus:underline focus:text-sky-700"
          >
            Templates
          </Link>
          <Link
            to="/residentes"
            className="text-sky-600 hover:underline hover:text-sky-700 focus:outline-none focus:underline focus:text-sky-700"
          >
            Residentes
          </Link>
          <button className="text-white bg-sky-600 rounded-md font-bold p-2 md:p-3 focus:outline-none focus:bg-sky-700">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};
