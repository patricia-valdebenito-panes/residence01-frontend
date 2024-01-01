import React, { useEffect, useState } from "react";
import formatDateAndTime from "../config/FormatDateAndHr.js";
import { ItemClientTable } from "../components/ItemClientTable.jsx";
 import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import useClient from "../hooks/useClient.jsx";

export const Clients = () => {
  const { clients } = useClient();
  console.log(clients)
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = window.innerWidth >= 768 ? 8 : 5;


  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Ordena los clientes por nombre en orden alfabético
  const sortedClients = clients.sort((a, b) => a.name.localeCompare(b.name));

  const paginatedTemplates = sortedClients.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  let date;

  return (
    <>
      <div className="text-3xl font-bold mb-4">Residentes</div>
      {paginatedTemplates.length ? (
        <>
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200 ">
              <tr className="cursor-pointer">
                <th className="p-3 text-start">Residente</th>
                <th className="p-3 text-start">Detalle</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTemplates.map((client) => {
                
                return (
                  <tr key={client._id} className="border-b border-gray-300">
                    <td className="p-3 text-start cursor-pointer hover:underline">
                    {client.name}
                  
                    </td>
                    <td className="p-3 text-start cursor-pointer text-gray-400 font-semibold hover:underline">
                      <Link
                        className="text-gray-400 font-semibold"
                        to={`${ client._id}`}
                      >
                        ver perfil
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-start mt-4">
            <ReactPaginate
              previousLabel={"Anterior"}
              nextLabel={"Siguiente"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil(clients.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination flex items-center space-x-2"}
              activeClassName={"bg-sky-700 text-white px-3 py-2 rounded"}
              pageClassName={
                "hover:bg-sky-200 cursor-pointer transition-all duration-200 ease-in-out px-3 py-2 rounded"
              }
              previousClassName={
                "hover:bg-sky-200 cursor-pointer transition-all duration-200 ease-in-out px-3 py-2 rounded"
              }
              nextClassName={
                "hover:bg-sky-200 cursor-pointer transition-all duration-200 ease-in-out px-3 py-2 rounded"
              }
            />
          </div>
        </>
      ) : (
        <p className="text text-center text-gray-600">Aún no hay registros</p>
      )}
    </>
  );
};
