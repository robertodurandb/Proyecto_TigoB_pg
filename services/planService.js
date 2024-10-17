const planModel = require('../models/planModel');

const createPlan = async(Data)=> {
    return planModel.createPlan(Data);
}
const getPlanes = async()=>{
    return planModel.getPlanes();
}

const getPlanById = async(id)=>{
    return planModel.getPlanById(id);
}
const updatePlan = async(id, Data)=>{
    // Aquí puedes agregar lógica adicional antes o después de actualizar el usuario
    // Por ejemplo, validaciones, notificaciones, etc.
    return planModel.updatePlan(id, Data);
}

module.exports={
    createPlan, updatePlan, getPlanes, getPlanById
}