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

  const updateImagen1caja = async(req, res) => {
    try { 
        const id = req.params;
        const nombreimg_caja_antes = req.file.filename;
        const Data = {nombreimg_caja_antes};
        const imagenUpdate = await instalacionService.updateImagen(id,Data);
        res.status(201).json(imagenUpdate);
        console.log("se actualizo la imagen1_caja_antes en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const updateImagen2potencia = async(req, res) => {
    try { 
        const id = req.params;
        const nombreimg_potencia_antes = req.file.filename;
        const Data = {nombreimg_potencia_antes};
        const imagenUpdate = await instalacionService.updateImagen(id,Data);
        res.status(201).json(imagenUpdate);
        console.log("se actualizo la imagen1_potencia_antes en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const updateImagen3caja = async(req, res) => {
    try { 
        const id = req.params;
        const nombreimg_caja_despues = req.file.filename;
        const Data = {nombreimg_caja_despues};
        const imagenUpdate = await instalacionService.updateImagen(id,Data);
        res.status(201).json(imagenUpdate);
        console.log("se actualizo la imagen3_caja_despues en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const updateImagen4potencia = async(req, res) => {
    try { 
        const id = req.params;
        const nombreimg_potencia_despues = req.file.filename;
        const Data = {nombreimg_potencia_despues};
        const imagenUpdate = await instalacionService.updateImagen(id,Data);
        res.status(201).json(imagenUpdate);
        console.log("se actualizo la imagen4_potencia_despues en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
  const updateImagen5instalacioninterna = async(req, res) => {
    try { 
        const id = req.params;
        const nombreimg_instalacion_interna = req.file.filename;
        const Data = {nombreimg_instalacion_interna};
        const imagenUpdate = await instalacionService.updateImagen(id,Data);
        res.status(201).json(imagenUpdate);
        console.log("se actualizo la imagen5_instalacioninterna en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const updateImagen6potenciainterna = async(req, res) => {
    try { 
        const id = req.params;
        const nombreimg_potencia_interna = req.file.filename;
        const Data = {nombreimg_potencia_interna};
        const imagenUpdate = await instalacionService.updateImagen(id,Data);
        res.status(201).json(imagenUpdate);
        console.log("se actualizo la imagen6_potencia_interna en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const updateImagen7contrato = async(req, res) => {
    try { 
        const id = req.params;
        const nombreimg_contrato = req.file.filename;
        const Data = {nombreimg_contrato};
        const imagenUpdate = await instalacionService.updateImagen(id,Data);
        res.status(201).json(imagenUpdate);
        console.log("se actualizo la imagen7_contrato en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const updateImagen8casa = async(req, res) => {
    try { 
        const id = req.params;
        const nombreimg_casa = req.file.filename;
        const Data = {nombreimg_casa};
        const imagenUpdate = await instalacionService.updateImagen(id,Data);
        res.status(201).json(imagenUpdate);
        console.log("se actualizo la imagen8_casa en Controller")
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
const getInstalacionesAll = async(req, res) => {
    try {
        const instalaciones = await instalacionService.getInstalacionesAll();
        res.status(201).json(instalaciones)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const getInstalacionesAll2 = async(req, res) => {
    try {
        const instalaciones2 = await instalacionService.getInstalacionesAll2();
        res.status(201).json(instalaciones2)
        
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
        // Conversión a números
        // const latitude = parseFloat(req.body.latitud);
        // const longitude = parseFloat(req.body.longitud);
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

const corregirDniCliente = async (req, res) => {
        try {
            const { nuevo_dni, dni_incorrecto } = req.body;

            // Validar que vengan los parámetros necesarios
            if (!nuevo_dni || !dni_incorrecto) {
                return res.status(400).json({
                    success: false,
                    message: 'Se requieren ambos parámetros: nuevo_dni y dni_incorrecto'
                });
            }

            // Llamar al servicio
            const resultado = await instalacionService.corregirDniCliente(nuevo_dni, dni_incorrecto);

            if (!resultado.success) {
                return res.status(400).json(resultado);
            }

            res.status(200).json(resultado);
        } catch (error) {
            console.error('Error en contratoController.corregirDniCliente:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Error interno del servidor al corregir DNI del cliente'
            });
        }
    }

module.exports = {
    getInstalaciones, getInstalacionById, getInstalacionesAll, getInstalacionesAll2, createInstalacion, updateInstalacion, 
    updateImagen1caja, updateImagen2potencia, updateImagen3caja, updateImagen4potencia, updateImagen5instalacioninterna,
    updateImagen6potenciainterna, updateImagen7contrato, updateImagen8casa, newupload, corregirDniCliente
}