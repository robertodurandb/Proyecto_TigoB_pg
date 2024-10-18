const express = require('express')
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const clienteController = require('../controllers/clienteController');
const contratoController = require('../controllers/contratoController');
const planController = require('../controllers/planController');
const instalacionController = require('../controllers/instalacionController');
const imagenController = require('../controllers/imagenController');
const pagocontroller = require('../controllers/pagoController');

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

//RUTAS IMAGENES
router.get('/getimagenes', verifyToken, imagenController.getImagenes);
router.get('/getimagen/:id', verifyToken, imagenController.getImagenById);
router.post('/createimagen', verifyToken, imagenController.createImagen);
router.put('/updateimagen/:id', verifyToken, imagenController.updateImagen);

//RUTAS PAGOS
router.get('/getpagos', verifyToken, pagocontroller.getPagos);
router.get('/getpago/:id', verifyToken, pagocontroller.getPagoById);
router.post('/createpago', verifyToken, pagocontroller.createPago);
router.put('/updatepago/:id', verifyToken, pagocontroller.updatePago);

module.exports = router;