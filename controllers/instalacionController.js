const instalacionService = require('../services/instalacionService')
const multer = require('multer')

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname) // Nombre único para el archivo
    }
  })
  let upload = multer({ storage: storage })
  const newupload = upload.single('image')

  const updateImagen = async(req, res) => {
    try { 
        const id = req.params;
        const nombreimg = req.file.filename;
        const tipoimg = req.file.mimetype;
        const Data = {nombreimg, tipoimg};
        const imagenUpdate = await instalacionService.updateImagen(id,Data);
        
        res.status(201).json(imagenUpdate);
        console.log("se actualizo la imagen en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getInstalaciones = async(req, res) => {
    try {
        const instalaciones = await instalacionService.getInstalaciones();
        res.status(201).json(instalaciones)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}
const getInstalacionById = async(req, res) => {
    const {id} = req.params;
    try {
        const instalacion = await instalacionService.getInstalacionById(id);
        if (!instalacion) {
            return res.status(404).json({message: 'Instalacion no encontrada'})
        }
        res.status(201).json(instalacion)
        console.log("si se encontro la instalacion: "+id)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const createInstalacion = async(req, res) => {
    try { 
        const Data = req.body;
        const newInstalacion = await instalacionService.createInstalacion(Data);
        res.status(201).json(newInstalacion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateInstalacion = async(req, res) => {
    try { 
        const id = req.params;
        const Data = req.body;
        const instalacionUpdate = await instalacionService.updateInstalacion(id,Data);
        
        res.status(201).json(instalacionUpdate);
        console.log("se actualizo la instalacion en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getInstalaciones, getInstalacionById, createInstalacion, updateInstalacion, updateImagen, newupload
}