import React from 'react'

export const TableVitalSigns = ({client, template,templateTC}) => {
  return (
    <>
    <div className="text-3xl font-bold mb-4">Template:</div>
         {template ? (
           <table className="border border-gray-300 w-full min-w-80 max-w-[700px]">
             <thead className="bg-gray-200 ">
               <tr className="cursor-pointer">
                 <th className="p-2 text-start">Datos</th>
                 <th className="p-2 text-start">Medidas</th>
               </tr>
             </thead>
             <tbody>
               <tr
                 key={template?._id}
                 className="border-b border-gray-300 min-h-10"
               >
                 <td className="mb-3 py-2 px-1">
                   <strong>Cliente:</strong>
                   <br></br>
                   <small>rut:{` ${client.rut}  `}</small> 
                 </td>
                 <td className="mb-3 py-2 px-1">
                   {` ${template.name} ${client.lastnamefather} ${client.lastnamemother}  `}
         
                
                   </td>
               </tr>
               <tr key={"18"} className="border-b border-gray-300 min-h-10">
                 <td className="mb-2 py-2 px-1">
                   <strong>Presión :</strong>
                 </td>
                 <td className="mb-2 py-2 px-1">{templateTC.presion?.$numberDecimal}</td>
               </tr>
   
               <tr key={"27"} className="border-b border-gray-300 min-h-10">
                 <td className="mb-2 py-2 px-1">
                   <strong>Pulso :</strong>
                 </td>
                 <td className="mb-2 py-2 px-1">{templateTC.FR?.$numberDecimal}</td>
               </tr>
               <tr key={"26"} className="border-b border-gray-300 min-h-10">
                 <td className="mb-2 py-2 px-1">
                   <strong>Temperatura (ºC):</strong>
                 </td>
                 <td className="mb-2 py-2 px-1">{templateTC.temperature?.$numberDecimal}</td>
               </tr>
   
               <tr key={"25"} className="border-b border-gray-300 min-h-10">
                 <td className="mb-2 py-2 px-1">
                   <strong>Frecuencia Respiratoria :</strong>
                 </td>
                 <td className="mb-2 py-2 px-1">{templateTC.FR?.$numberDecimal}</td>
               </tr>
               <tr key={"24"} className="border-b border-gray-300 min-h-10">
                 <td className="mb-2 py-2 px-1">
                   <strong>Saturación :</strong>
                 </td>
                 <td className="mb-2 py-2 px-1">{templateTC.SAC?.$numberDecimal}</td>
               </tr>
               <tr key={"23"} className="border-b border-gray-300 min-h-10">
                 <td className="mb-2 py-2 px-1">
                   <strong>Observaciones:</strong>
                 </td>
                 <td className="mb-2 py-2 px-1">{templateTC.Obs}</td>
               </tr>
               <tr key={"11"} className="border-b border-gray-300 min-h-10">
                 <td className="mb-2 py-2 px-1">
                   <strong>Fecha de creación :</strong>{" "}
                   {/* <small>{formatearFecha(createdAt)}</small> */}
                 </td>
   
                 <td className="mb-2 py-2 px-1">
                   <strong>Fecha de actualización :</strong>
                   {/* <small>{formatearFecha(updatedAt)}</small> */}
                 </td>
               </tr>
             </tbody>
           </table>
   
         ) : (
           <p className="text text-center text-gray-600">cargando...</p>
         )}
       </>
  )
}
