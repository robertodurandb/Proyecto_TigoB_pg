const userModel = require('../models/userModel')

const createUser = async(userData)=> {
    return userModel.createUser(userData);
}
const getUsers = async()=>{
    return userModel.getUsers();
}

const getUsersById = async(id)=>{
    return userModel.getUserById(id);
}
const updateUser = async(id, userData)=>{
    // Aquí puedes agregar lógica adicional antes o después de actualizar el usuario
    // Por ejemplo, validaciones, notificaciones, etc.
    return userModel.updateUser(id, userData);
}
const updatePassword = async(id, userPassword)=>{
    // Aquí puedes agregar lógica adicional antes o después de actualizar el usuario
    // Por ejemplo, validaciones, notificaciones, etc.
    console.log("soy userService")
    console.log(id)
    console.log(userPassword)
    return userModel.updatePassword(id, userPassword);
}
module.exports={
    createUser, getUsersById, getUsers, updateUser, updatePassword
}