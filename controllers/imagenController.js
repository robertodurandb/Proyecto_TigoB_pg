const imagenService = require('../services/imagenService')
const multer = require('multer')

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

    const uploadfile = async(req, res) => {
        try { 
            const nombreimg = req.file.filename;
            const tipo = req.file.mimetype;
            const Data = {nombreimg, tipo}
            const newImagen = await imagenService.createImagen2(Data);
            res.status(201).json(newImagen);
            console.log(Data)
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

module.exports = {
    getImagenes, getImagenById, createImagen, updateImagen, newupload, uploadfile
}