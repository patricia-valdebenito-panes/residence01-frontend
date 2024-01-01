export const validarRut = (rut) => {
    // Eliminar espacios, puntos y guiones
    let rut = rut?.replace(/\s|\.|-/g, '');

    // Validar longitud
    if (rut?.length !== 9) {
        return {
            msg:'Ingresar rut válido. Ejemplo: 10.999.999-9',
            error:true
        };
    }

    // Validar que los caracteres sean numéricos
    if (!/^\d+$/.test(rut.slice(0, -1))) {
        return {
            msg:'Ingresar rut válido. Ejemplo: 10.999.999-9',
            error:true
        };
    }

    // Validar que el último caracter sea numérico o 'k'
    if (!/^\d|k|K$/.test(rut.slice(-1))) {
        return {
            msg:'Ingresar rut válido. Ejemplo: 10.999.999-9',
            error:true
        };
    }

    // Si pasa todas las validaciones, retorna el RUT sin puntos, guiones o espacios
    return rut;
}

// Ejemplos de uso:
// console.log(validarRut("17.680.828-4")); // Devuelve "176808284"
// console.log(validarRut(" 17680828-4 ")); // Devuelve "176808284"
// console.log(validarRut("176808284"));    // Devuelve "176808284"
// console.log(validarRut("176808284 "));   // Devuelve "176808284"
