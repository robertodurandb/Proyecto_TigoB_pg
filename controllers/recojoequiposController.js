const recojoequiposService = require('../services/recojoequiposService')
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
  // Filtro para solo aceptar imágenes
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes'), false);
  }
};
  let upload = multer({
     storage: storage,
    fileFilter: fileFilter })
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
        const recojos_pendientes = await recojoequiposService.getRecojosPendientes();
        res.status(201).json(recojos_pendientes)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const getRecojosTerminados = async(req, res) => {
    try {
        const recojos_terminados = await recojoequiposService.getRecojosTerminados();
        res.status(201).json(recojos_terminados)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const getRecojosCancelados = async(req, res) => {
    try {
        const recojos_cancelados = await recojoequiposService.getRecojosCancelados();
        res.status(201).json(recojos_cancelados)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
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
    createRecojo, getRecojosPendientes, getRecojosTerminados, updateRecojos, getRecojosCancelados, updateCortePoste, newupload
}