const userService = require('../services/userService')

const getusers = async(req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(201).json(users)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}
const getuserById = async(req, res) => {
    const {id} = req.params;
    try {
        
        const user = await userService.getUsersById(id);
        if (!user) {
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        res.status(201).json(user)
        console.log("si se encontro el usuario: "+id)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const createUser = async(req, res) => {
    try { 
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateUser = async(req, res) => {
    try { 
        const id = req.params;
        const userData = req.body;
        const userUpdate = await userService.updateUser(id,userData);
        
        res.status(201).json(userUpdate);
        console.log("se actualizo el usuario en userController")
        console.log(userData)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updatePassword = async(req, res) => {
    try { 
        const id = req.params;
        const userPassword = req.body;
        const passwordUpdate = await userService.updatePassword(id,userPassword);
        
        res.status(201).json(passwordUpdate);
        console.log("se actualizo el password del user")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getusers, getuserById, createUser, updateUser, updatePassword
}