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