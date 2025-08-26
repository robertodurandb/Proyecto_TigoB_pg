const express = require('express')
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const clienteController = require('../controllers/clienteController');
const ordentrabajoController = require('../controllers/ordentrabajoController');
const planController = require('../controllers/planController');
const instalacionController = require('../controllers/instalacionController');
const pagocontroller = require('../controllers/pagoController');
const estadoController = require('../controllers/estadoController');
const sedeController = require('../controllers/sedeController');
const cambioestadoController = require('../controllers/cambioestadoController');
const recojoequiposController = require('../controllers/recojoequiposController');
const historicoController = require('../controllers/historicoController');
const gestioncrepsController = require('../controllers/gestioncrepsController');

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

//RUTAS ORDENES DE TRABAJO OT
router.get('/getordentrabajos', verifyToken, ordentrabajoController.getOrdentrabajo);
router.get('/getordentrabajo/:id', verifyToken, ordentrabajoController.getOrdentrabajoById);
router.post('/createordentrabajo', verifyToken, ordentrabajoController.createOrdentrabajo);
router.put('/updateordentrabajo/:id', verifyToken, ordentrabajoController.updateOrdentrabajo);

router.put('/updatefotocajaantes/:id', verifyToken, instalacionController.newupload, instalacionController.updateImagen1caja);
router.put('/updatefotopotenciaantes/:id', verifyToken, instalacionController.newupload, instalacionController.updateImagen2potencia);
router.put('/updatefotocajadespues/:id', verifyToken, instalacionController.newupload, instalacionController.updateImagen3caja);
router.put('/updatefotopotenciadespues/:id', verifyToken, instalacionController.newupload, instalacionController.updateImagen4potencia);
router.put('/updatefotoinstalacion/:id', verifyToken, instalacionController.newupload, instalacionController.updateImagen5instalacioninterna);
router.put('/updatefotopotenciainterna/:id', verifyToken, instalacionController.newupload, instalacionController.updateImagen6potenciainterna);
router.put('/updatefotocontrato/:id', verifyToken, instalacionController.newupload, instalacionController.updateImagen7contrato);
router.put('/updatefotocasa/:id', verifyToken, instalacionController.newupload, instalacionController.updateImagen8casa);

router.get('/orders_install', verifyToken, ordentrabajoController.getOrdenesConInsta);//todoinstacli
router.get('/orders_pending', verifyToken, ordentrabajoController.getOrdenesSinInsta);//pendinstacli
router.get('/orders_install_user/:id', verifyToken, ordentrabajoController.getOrdenesConInstaForUser);//todoinstacliforuser

//RUTAS PLANES
router.get('/getplanes', verifyToken, planController.getPlanes);
router.get('/getplan/:id', verifyToken, planController.getPlanById);
router.post('/createplan', verifyToken, planController.createPlan);
router.put('/updateplan/:id', verifyToken, planController.updatePlan);

//RUTAS SEDES
router.get('/getsedes', verifyToken, sedeController.getSedes);
router.get('/getsede/:id', verifyToken, sedeController.getSedeById);
router.post('/createsede', verifyToken, sedeController.createSede);
router.put('/updatesede/:id', verifyToken, sedeController.updateSede);

//RUTAS INSTALACIONES
router.get('/getinstalaciones', verifyToken, instalacionController.getInstalaciones);
router.get('/getinstalacion/:id', verifyToken, instalacionController.getInstalacionById);
router.get('/getinstalacionesall', verifyToken, instalacionController.getInstalacionesAll);//todocontratosactiv Y SUSPENDIDOS
router.get('/getinstalacionesall2', verifyToken, instalacionController.getInstalacionesAll2);//todocontratos activos, suspendidos y cancelados.
router.post('/createinstalacion', verifyToken, instalacionController.createInstalacion);
router.put('/updateinstalacion/:id', verifyToken, instalacionController.updateInstalacion);

//RUTAS PAGOS
router.get('/getpagos', verifyToken, pagocontroller.getPagos);
router.get('/getpago/:id', verifyToken, pagocontroller.getPagoById);
router.post('/createpago', verifyToken, pagocontroller.createPago);
router.put('/updatepago/:id', verifyToken, pagocontroller.updatePago);
router.get('/getpagosall', verifyToken, pagocontroller.getPagosAll);
router.get('/getcontrolpagos', verifyToken, pagocontroller.getControlPagos);

router.post('/importar', verifyToken, pagocontroller.newexcelfile, pagocontroller.insertPagos);

//RUTAS CAMBIOESTADOS
router.get('/getcambioestados', verifyToken, cambioestadoController.getCambioestados);
router.get('/getcambioestadosall', verifyToken, cambioestadoController.getCambioestadosAll);
router.post('/createcambioestado', verifyToken, cambioestadoController.createCambioestado);

//RECOJO EQUIPOS
router.post('/create_recojoequipos', verifyToken, recojoequiposController.createRecojo);
router.get('/getrecojos_pendientes', verifyToken, recojoequiposController.getRecojosPendientes);
router.get('/getrecojos_terminados', verifyToken, recojoequiposController.getRecojosTerminados);
router.get('/getrecojos_cancelados', verifyToken, recojoequiposController.getRecojosCancelados);
router.put('/update_recojoequipos/:id', verifyToken, recojoequiposController.updateRecojos);
router.put('/update_corteposte/:id', verifyToken, recojoequiposController.newupload, recojoequiposController.updateCortePoste);

//HISTORICO CAJAS Y EQUIPOS Y PLANES
router.post('/create_historicocajas', verifyToken, historicoController.createHistoricoCajas);
router.post('/create_historicoequipos', verifyToken, historicoController.createHistoricoEquipos);
router.post('/create_historicoplanes', verifyToken, historicoController.createHistoricoPlanes);
router.post('/create_historicodiapago', verifyToken, historicoController.createHistoricoDiaPago);
router.get('/gethistorico_cajas', verifyToken, historicoController.getHistoricoCajas);
router.get('/gethistorico_equipos', verifyToken, historicoController.getHistoricoEquipos);
router.get('/gethistorico_planes', verifyToken, historicoController.getHistoricoPlanes);
router.get('/gethistorico_diapago', verifyToken, historicoController.getHistoricoDiaPago);

//GESTION CREPS
router.get('/getcreps_pendientes', verifyToken, gestioncrepsController.getCrepsPendientes);
router.get('/getcreps_terminados', verifyToken, gestioncrepsController.getCrepsTerminados);
router.get('/getcreps_cancelados', verifyToken, gestioncrepsController.getCrepsCancelados);
router.put('/update_creps/:id', verifyToken, gestioncrepsController.updateCreps);

//CORREGIR DNI CLIENTE
router.post('/contratos/corregir-dni', verifyToken, instalacionController.corregirDniCliente);

//RUTAS LECTURA LOGS
router.get('/getlogs', verifyToken, (req, res) => {
    // Leer el archivo de logs y enviarlo como respuesta
    const fecha = new Date();
    let anio = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    let dia = fecha.getDate();
    let diaf = "";
    if(dia<10){
        diaf = "0"+dia;
    }else{
        diaf = dia;
    }
    let combined = 'combined-'+anio+'-'+mes+'-'+diaf+'.log';

    fs.readFile(combined, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer los logs');
        } else {
            console.log(data)
            res.send(data)
        }

    });
})

//RUTAS ESTADOS
router.get('/getestados', verifyToken, estadoController.getEstados);

module.exports = router;