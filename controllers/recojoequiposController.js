const recojoequiposService = require('../services/recojoequiposService');
const multer = require('multer');
const { uploadsPath } = require('../config/uploads');
const path = require('path');
const fs = require('fs');


// Crear directorio de uploads si no existe
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// Configuración de Multer usando la ruta dinámica
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath); // Usar la ruta dinámica
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Límite de 5MB
  },
  fileFilter: (req, file, cb) => {
    // Aceptar solo imágenes
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimeType && extName) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten archivos de imagen (jpeg, jpg, png, gif)'));
  }
});

    // Middleware para subir una imagen
  const newupload = upload.single('image')

  //REGISTRAR CORTE POSTE CON EVIDENCIA FOTO
const updateCortePoste = async(req, res) => {
    try { 
        const id = req.params;
        const { 
            comentario,
            tecnico_completado_poste,
            fecha_completado_poste,
            estado 
        } = req.body;


        // const foto_evidencia = req.file.filename;
        const Data = {
            comentario,
            tecnico_completado_poste,
            fecha_completado_poste,
            estado: estado || 'COMPLETADO_POSTE', // Valor por defecto
        };

        // Solo agregar la foto_evidencia si se subió un archivo
        if (req.file) {
            Data.foto_evidencia = req.file.filename;
        }
        
        const recojosUpdate = await recojoequiposService.updateRecojos(id, Data);
        
        res.status(201).json(recojosUpdate);
        console.log("se actualizo el CORTE_POSTE en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createRecojo = async(req, res) => {
    try { 
        const createrecojoData = req.body;
        const newRecojo = await recojoequiposService.createRecojo(createrecojoData);
        res.status(201).json(newRecojo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getRecojosPendientes = async(req, res) => {
    try {
        const sedeFilter = req.sedeFilter; // Del middleware de sede
        const recojos_pendientes = await recojoequiposService.getRecojosPendientes(sedeFilter);
        res.status(201).json(recojos_pendientes)
        console.log('si se encontro los Recojos pendientes de la sede '+sedeFilter)
    } catch (error) {
         res.status(400).json({ error: error.message });
    }
}

const getRecojosTerminados = async(req, res) => {
    try {
        const sedeFilter = req.sedeFilter; // Del middleware de sede
        const recojos_terminados = await recojoequiposService.getRecojosTerminados(sedeFilter);
        res.status(201).json(recojos_terminados)
        console.log('si se encontro los Recojos completados de la sede '+sedeFilter)
    } catch (error) {
         res.status(400).json({ error: error.message });
    }
}

const getRecojosTerminadosForUser = async(req, res) => {
    const {id} = req.params;
    try {
        const recojos_terminados = await recojoequiposService.getRecojosTerminadosForUser(id);
        if (!recojos_terminados) {
            return res.status(404).json({message: 'No se encontraron recojos para el usuario'})
        }
        res.status(201).json(recojos_terminados)
        console.log("si se encontraron los recojos para el usuario: "+id)
    } catch (error) {
         res.status(400).json({ error: error.message });
    }
}

const getRecojosCancelados = async(req, res) => {
    try {
        const recojos_cancelados = await recojoequiposService.getRecojosCancelados();
        res.status(201).json(recojos_cancelados)
        
    } catch (error) {
         res.status(400).json({ error: error.message });
    }
}

const getRecojosCanceladosForUser = async(req, res) => {
    const {id} = req.params;
    try {
        const cancelados = await recojoequiposService.getRecojosCanceladosForUser(id);
        if (!cancelados) {
            return res.status(404).json({message: 'No se encontraron recojos para el usuario'})
        }
        res.status(201).json(cancelados)
        console.log("si se encontraron los recojos cancelados para el usuario: "+id)
        console.log(cancelados)
    } catch (error) {
         res.status(400).json({ error: error.message });
    }
}

const updateRecojos = async(req, res) => {
    try { 
        const id = req.params;
        const Data = req.body;
        const recojosUpdate = await recojoequiposService.updateRecojos(id,Data);
        
        res.status(201).json(recojosUpdate);
        console.log("se actualizo la OT RECOJOS EN CONTROLLER")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createRecojo, getRecojosPendientes, getRecojosTerminados, getRecojosTerminadosForUser, updateRecojos, getRecojosCancelados, 
    getRecojosCanceladosForUser, updateCortePoste, newupload
}