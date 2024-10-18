const imagenService = require('../services/imagenService')

const getImagenes = async(req, res) => {
    try {
        const imagenes = await imagenService.getImagenes();
        res.status(201).json(imagenes)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}
const getImagenById = async(req, res) => {
    const {id} = req.params;
    try {
        const imagen = await imagenService.getImagenById(id);
        if (!imagen) {
            return res.status(404).json({message: 'Imagen no encontrada'})
        }
        res.status(201).json(imagen)
        console.log("si se encontro la imagen: "+id)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const createImagen = async(req, res) => {
    try { 
        const Data = req.body;
        const newImagen = await imagenService.createImagen(Data);
        res.status(201).json(newImagen);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateImagen = async(req, res) => {
    try { 
        const id = req.params;
        const Data = req.body;
        const imagenUpdate = await imagenService.updateImagen(id,Data);
        
        res.status(201).json(imagenUpdate);
        console.log("se actualizo la Imagen en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getImagenes, getImagenById, createImagen, updateImagen
}