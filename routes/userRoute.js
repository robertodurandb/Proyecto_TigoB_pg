const express = require('express')
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const clienteController = require('../controllers/clienteController');
const contratoController = require('../controllers/contratoController');
const planController = require('../controllers/planController');
const instalacionController = require('../controllers/instalacionController');
const pagocontroller = require('../controllers/pagoController');
const estadoController = require('../controllers/estadoController');
const cambioestadoController = require('../controllers/cambioestadoController');

const fs = require('fs');

const verifyToken = require('../middlewares/jwt');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('hola mundo')
})

//RUTA LOGIN
router.post('/dologin', loginController.doLogin);

//RUTAS USUARIOS
router.get('/getusers', verifyToken, userController.getusers);
router.get('/getuser/:id', verifyToken, userController.getuserById);
router.post('/createuser', verifyToken, userController.createUser);
router.put('/updateuser/:id', verifyToken, userController.updateUser);
router.put('/updatepassword/:id', verifyToken, userController.updatePassword);

//RUTAS CLIENTES
router.get('/getclientes', verifyToken, clienteController.getClientes);
router.get('/getcliente/:id', verifyToken, clienteController.getClienteById);
router.post('/createcliente', verifyToken, clienteController.createCliente);
router.put('/updatecliente/:id', verifyToken, clienteController.updateCliente);

//RUTAS CONTRATOS
router.get('/getcontratos', verifyToken, contratoController.getContratos);
router.get('/getcontrato/:id', verifyToken, contratoController.getContratoById);
router.post('/createcontrato', verifyToken, contratoController.createContrato);
router.put('/updatecontrato/:id', verifyToken, contratoController.updateContrato);

router.get('/todoinstacli', verifyToken, contratoController.getContratosConInsta);
router.get('/pendinstacli', verifyToken, contratoController.getContratosSinInsta);
router.get('/todocontratosactiv', verifyToken, contratoController.getContratosAllInsta);

//RUTAS PLANES
router.get('/getplanes', verifyToken, planController.getPlanes);
router.get('/getplan/:id', verifyToken, planController.getPlanById);
router.post('/createplan', verifyToken, planController.createPlan);
router.put('/updateplan/:id', verifyToken, planController.updatePlan);

//RUTAS INSTALACIONES
router.get('/getinstalaciones', verifyToken, instalacionController.getInstalaciones);
router.get('/getinstalacion/:id', verifyToken, instalacionController.getInstalacionById);
router.post('/createinstalacion', verifyToken, instalacionController.createInstalacion);
router.put('/updateinstalacion/:id', verifyToken, instalacionController.updateInstalacion);
router.put('/updateimagen/:id', verifyToken, instalacionController.newupload, instalacionController.updateImagen);

//RUTAS PAGOS
router.get('/getpagos', verifyToken, pagocontroller.getPagos);
router.get('/getpago/:id', verifyToken, pagocontroller.getPagoById);
router.post('/createpago', verifyToken, pagocontroller.createPago);
router.put('/updatepago/:id', verifyToken, pagocontroller.updatePago);
router.get('/getpagosall', verifyToken, pagocontroller.getPagosAll);

router.post('/importar', verifyToken, pagocontroller.newexcelfile, pagocontroller.insertPagos);

//RUTAS CAMBIOESTADOS
router.get('/getcambioestados', verifyToken, cambioestadoController.getCambioestados);
router.get('/getcambioestadosall', verifyToken, cambioestadoController.getCambioestadosAll);
router.post('/createcambioestado', verifyToken, cambioestadoController.createCambioestado);

//RUTAS LECTURA LOGS
router.get('/logs', verifyToken, (req, res) => {
    // Leer el archivo de logs y enviarlo como respuesta
    const fecha = new Date();
    let anio = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    let dia = fecha.getDate();
    let combined = 'combined-'+anio+'-'+mes+'-'+dia+'.log';

    fs.readFile(combined, 'utf8', (err, data) => {
        if (err) {
            logger.error('Error al leer el archivo de logs:', err);
            res.status(500).send('Error al leer los logs');
        } else {
            res.json(data);
        }
    });
})

//RUTAS ESTADOS
router.get('/getestados', verifyToken, estadoController.getEstados);

module.exports = router;