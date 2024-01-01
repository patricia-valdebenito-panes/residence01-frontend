function formatearFecha(input) {
  const fecha = new Date(input);
  
  // Obtener el día y el mes
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Nota: en JavaScript, los meses comienzan desde 0

  // Agregar ceros a la izquierda si es necesario
  const diaFormateado = dia < 10 ? `0${dia}` : dia;
  const mesFormateado = mes < 10 ? `0${mes}` : mes;
  const anioFormateado = fecha.getFullYear();
  // Formatear y devolver la fecha
  return `${diaFormateado}-${mesFormateado-1}-${anioFormateado}`;
}


const formatDateAndTime = (input) => {
    const date = new Date(input);
 // Verificar si la fecha es válida
 if (isNaN(date.getTime())) {
    console.error('Fecha no válida');
    return { dayDate: '', dayHour: '' };
  }

  // Obtener la fecha en formato 'YYYY-MM-DD'

  const dayDate_format_yyyy_mm_dd = date.toISOString().split('T')[0];
 
  // Obtener la fecha en formato 'YYYY-MM-DD'
  const dayDate_format_dd_mm = formatearFecha(dayDate_format_yyyy_mm_dd);
  
  const dayDate_format_dd_mm_yyyy = dayDate_format_yyyy_mm_dd.split('-').reverse().join('-');

  // Obtener la hora y los minutos en el huso horario de Chile
  const chileTime = new Intl.DateTimeFormat('es-CL', {
    timeZone: 'America/Santiago',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

  const dayHour = chileTime.format(date);

  return { dayDate_format_yyyy_mm_dd,dayDate_format_dd_mm_yyyy, dayHour };
};

export default formatDateAndTime;