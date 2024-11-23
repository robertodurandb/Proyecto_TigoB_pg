const pagoService = require('../services/pagoService')
const multer = require('multer')
const exceljs = require('exceljs')

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload_pagos/'); // Directorio donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname) // Nombre único para el archivo
  }
})
let upload = multer({ storage: storage })
const newexcelfile = upload.single('excel')

//INSERT PAGOS CARGADOS
const insertPagos = async(req, res) => {

    try {
     // Recibir el archivo Excel
     const file = req.file
  
    // Leer el archivo Excel
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(file.path)
        const worksheet = workbook.getWorksheet(1); // Suponiendo que los datos están en la primera hoja
        // Iterar sobre las filas y insertar los datos en la base de datos
        worksheet.eachRow((row, number) => {
          if (number > 5) { // Saltar la cabecera
            let datofecha = row.getCell(1).value
            const partesFecha = datofecha.split('/');
            const newdatofecha = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]).toISOString().slice(0, 10);
            const Data = {
              // Mapear los datos de la fila a los campos de la tabla            
              fechapago2: newdatofecha,
              descripcion: row.getCell(3).value,
              dnipago: row.getCell(4).value,
              monto: row.getCell(5).value,
              agencia: row.getCell(7).value,
              operacion: row.getCell(8).value,
              hora: row.getCell(9).value,
              // ...
            };
            pagoService.insertPagos(Data)
        }       
    })
        

        res.status(201).json("Data corrercta");
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//GET PAGOS
const getPagos = async(req, res) => {
    try {
        const pagos = await pagoService.getPagos();
        res.status(201).json(pagos)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}
const getPagosAll = async(req, res) => {
    try {
        const pagos = await pagoService.getPagosAll();
        res.status(201).json(pagos)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}
const getPagoById = async(req, res) => {
    const {id} = req.params;
    try {
        const pago = await pagoService.getPagoById(id);
        if (!pago) {
            return res.status(404).json({message: 'pago no encontrado'})
        }
        res.status(201).json(pago)
        console.log("si se encontro el pago: "+id)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        }) 
    }
}

const createPago = async(req, res) => {
    try { 
        const Data = req.body;
        const newPago = await pagoService.createPago(Data);
        res.status(201).json(newPago);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updatePago = async(req, res) => {
    try { 
        const id = req.params;
        const Data = req.body;
        const pagoUpdate = await pagoService.updatePago(id,Data);
        
        res.status(201).json(pagoUpdate);
        console.log("se actualizo el pago en Controller")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getPagos, getPagoById, createPago, updatePago, getPagosAll, newexcelfile, insertPagos
}