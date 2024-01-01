import React, { useEffect, useState } from "react";
import useTemplate from "../hooks/useTemplate";
import formatDateAndTime from "../config/FormatDateAndHr.js";
import ReactPaginate from "react-paginate";
import useAuth from "../hooks/useAuth.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css"; // import the styles
import "react-tabulator/lib/css/tabulator.min.css"; // import the styles
import html2pdf from "html2pdf.js";


export const Templates = () => {
  const { auth } = useAuth();
  const { templates } = useTemplate();
  const datetoday = new Date();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = window.innerWidth >= 768 ? 20 : 10;
  const navigate = useNavigate();

  const getType = (type) => {
    let nameType = "";
    switch (type) {
      case "CT2":
        nameType = "Cambio de posición";
        break;
      case "CT3":
        nameType = "Curación";
        break;
      case "CT4":
        nameType = "Vacuna";
        break;
      case "CT5":
        nameType = "Visita Médica";
        break;
      case "CT6":
        nameType = "Signos Vitales";
        break;
      default:
        console.log(`Sorry, we are out of ${expr}.`);
    }
    return nameType;
  };

  // Ordena los templates por fecha de creación descendente
  const sortedTemplates = templates.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleCellClick = (e, cell) => {
    const rowData = cell.getRow().getData();
    // Accede a los datos de la fila haciendo clic en la celda
    console.log('Datos de la fila:', rowData.id);
  
    // Aquí puedes redirigir a la página deseada o realizar otras acciones según tus necesidades
    navigate(`/templates/${rowData.id}`);
  };


  const formatDateToTabulator = () => {
    let data = [];
    let initData = sortedTemplates;
    for (let i = 0; i < initData.length; i++) {
      console.log(initData[i]);
      let dcreatedAt = initData[i].createdAt;
      let dupdatedAt = initData[i].updatedAt;
      let ddate = dcreatedAt === dupdatedAt ? dcreatedAt : dupdatedAt;

      data.push({
        id: `${initData[i]._id}`,
        type: getType(initData[i].type),
        client:initData[i].name,
        date: formatDateAndTime(ddate).dayDate_format_yyyy_mm_dd,
        hr: formatDateAndTime(ddate).dayHour,
      });
    }
    return data;
  };

  const customTimeFilter = (headerValue, rowValue, rowData, filterParams) => {
    if (!headerValue || typeof headerValue !== "string") {
      return true; // No hay filtro, muestra todos los resultados
    }
  
    const [inputHour, inputMinutes] = headerValue.split(":");
    const [rowHour, rowMinutes] = rowValue.split(":");
  
    const inputTime = parseInt(inputHour) * 60 + parseInt(inputMinutes);
    const rowTime = parseInt(rowHour) * 60 + parseInt(rowMinutes);
    console.log("---",rowTime >= inputTime)
    return rowTime >= inputTime;
  };


  const columns = [
   
    { title: "Tipo", field: "type", headerFilter: "input" },
    { title: "Residente", field: "client", headerFilter: "input" },
    { 
      title: "Fecha", 
      field: "date", 
      headerFilter: "date",  // Indicar que el filtro es de tipo fecha
      editor: "date",               // Usar el editor de fecha para filtrar
      editorParams: {
        format: "MM-DD-YYYY",        // Formato de fecha deseado
        allowEmpty: true,            // Permitir valores de fecha vacíos
      },
    },
    {
      title: "Hora ej: HH:mm",
      field: "hr",
      headerFilter: "input", // Usar el editor de entrada para filtrar
      headerFilterFunc: customTimeFilter,
      headerFilterLiveFilter: false,
      editorParams: {
        pattern: "HH:mm",
        mask: true,
        allowEmpty: true,
        placeholder: "HH:mm",
      },
    },
    { title: "Ver", field: "id", cellClick:handleCellClick},
    
  ];

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const paginatedTemplates = sortedTemplates.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );


  const exportToPdf = () => {
    const paramsDate = datetoday.getDate() + "-" + (datetoday.getMonth() + 1);
    const element = document?.getElementById("templates-list-table");
    const title = "Reporte";
    const subtitle = `Fecha emisión: ${paramsDate}`;
  
    // Oculta los filtros
    const filters = document.querySelectorAll('.tabulator-header-filter');
    filters.forEach(filter => filter.style.display = 'none');
  
    const options = {
      filename: `lista-template-${paramsDate}.pdf`,
      jsPDF: {
        unit: "pt",
        format: "a4",
        orientation: "portrait",
        putOnlyUsedFonts: true,
        font: "times",
      },
      margin: 30,
    };
  
    // Configura el ancho del contenedor según tus necesidades (por ejemplo, 800px)
    if (element) {
      element.style.width = "100%";
      element.style.fontSize = "12px";
  
      // Agrega título y subtítulo al contenedor antes de la exportación
      const titleElement = document.createElement("div");
      titleElement.innerText = title;
      titleElement.style.fontSize = "18px";
      titleElement.style.fontWeight = "bold";
      titleElement.style.marginBottom = "10px";
  
      const subtitleElement = document.createElement("div");
      subtitleElement.innerText = subtitle;
      subtitleElement.style.fontSize = "14px";
      subtitleElement.style.marginBottom = "10px";
  
      element.insertBefore(titleElement, element.firstChild);
      element.insertBefore(subtitleElement, element.firstChild);
    }
  
    html2pdf(element, options);
  };
  const rowFormatter = (row) => {
    const rowData = row.getData();
    const rowElement = row.getElement();
  
    // Accede o manipula el elemento de la fila según tus necesidades
    // rowElement.setAttribute('data-id-template', );
  
    // También puedes utilizar los datos de la fila para personalizar la lógica
    console.log('Datos de la fila:', rowData);
    console.log('Datos de la fila:', row);
  };

  let date;


  return (
    <>
    <style>
        {`
          /* Estilos personalizados para la tabla */
          .custom-table {
            background-color: #f2f2f2; /* Color de fondo gris */
          
          }
          .tabulator-col-title {
            padding: 5px 3px 5px 3px; /*
            font-size: 14px;
          }
        `}
      </style>

      <div className="text-3xl font-bold mb-4 overflow-x-auto">Templates</div>

      <div>
        <button onClick={exportToPdf}>Exportar a PDF</button>
      </div>
      {templates.length ? (
        <div>
          <ReactTabulator
            data={formatDateToTabulator()}
            columns={columns}
            // layout={"fitData"}
            layout={"fitColumns"}
            pagination="local"
            className="custom-table" 
            headerBackgroundColor	="#f2f2f2"
            id="templates-list-table"
           
          />
        </div>
      ) : (
        <p className="text text-center text-gray-600">Aún no hay registros</p>
      )}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};
