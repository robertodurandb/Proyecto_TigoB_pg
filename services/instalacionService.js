const instalacionModel = require('../models/instalacionModel');

// Lista de campos que NO deben convertirse a mayúsculas
const EXCLUDED_FIELDS = ['nombre_imgcasa', 'user_create'];

// Función para conversión selectiva a mayúsculas
const convertSelectiveToUpper = (data) => {
  const processedData = {...data};
  
  for (const key in processedData) {
    // Si es string, no está en la lista de excluidos y no es nulo/undefined
    if (typeof processedData[key] === 'string' && 
        !EXCLUDED_FIELDS.includes(key) && 
        processedData[key] !== null) {
      processedData[key] = processedData[key].toUpperCase();
    }
  }
  return processedData;
};

const createInstalacion = async(Data)=> {
    const processedData = convertSelectiveToUpper(Data);
    return instalacionModel.createInstalacion(processedData);
}
const getInstalaciones = async()=>{
    return instalacionModel.getInstalaciones();
}

const getInstalacionById = async(id)=>{
    return instalacionModel.getInstalacionById(id);
}
const getInstalacionesAll = async()=>{
    return instalacionModel.getInstalacionesAll();
}
const getInstalacionesAll2 = async()=>{
    return instalacionModel.getInstalacionesAll2();
}
const updateInstalacion = async(id, Data)=>{
    const processedData = convertSelectiveToUpper(Data);
    return instalacionModel.updateInstalacion(id, processedData);
}
const updateImagen = async(id, Data)=>{
    return instalacionModel.updateImagen(id, Data);
}
const corregirDniCliente = async(nuevo_dni, dni_incorrecto)=>{
    // return instalacionModel.corregirDniCliente(nuevo_dni, dni_incorrecto)
    try {
        if (!nuevo_dni || !dni_incorrecto) {
            throw new Error('Se requieren ambos parámetros: nuevo DNI y DNI incorrecto');
        }

        if (nuevo_dni === dni_incorrecto) {
            throw new Error('El nuevo DNI no puede ser igual al DNI incorrecto');
        }

        const resultado = await instalacionModel.corregirDniCliente(nuevo_dni, dni_incorrecto);
        
        return {
            success: true,
            message: 'DNI corregido exitosamente',
            data: resultado
        };
    } catch (error) {
        console.error('Error en ContratoService.corregirDniCliente:', error);
        // Aquí simplemente relanzamos el error para que mantenga su mensaje original
        throw error;
    }
}

module.exports={
    createInstalacion, updateInstalacion, getInstalaciones, getInstalacionById, getInstalacionesAll, getInstalacionesAll2, updateImagen, corregirDniCliente
}