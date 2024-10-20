const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createContrato = async(contratoData) => {
    
    const { num_contrato, planes_idplanes, cliente_dnicliente, fecha_contrato, diapago, fechaprog_instalacion, observacion_contrato, instalacion_idinstalacion, estadoc_instalacion, estado_servicio } = contratoData;

    try {
        const client = await pool.connect();
        const query = 'INSERT INTO contrato(num_contrato, planes_idplanes, cliente_dnicliente, fecha_contrato, diapago, fechaprog_instalacion, observacion_contrato, instalacion_idinstalacion, estadoc_instalacion, estado_servicio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
        const values = [num_contrato, planes_idplanes, cliente_dnicliente, fecha_contrato, diapago, fechaprog_instalacion, observacion_contrato, instalacion_idinstalacion, estadoc_instalacion, estado_servicio];
        const result = await client.query(query, values);
        client.release();
        console.log("SOY El CONTRATOMODEL")
        console.log(result.rows)
        return result.rows[0];
        
    } catch (error) {
        console.log("Error creating Client: "+error);
        throw error;
    }
};

// Función para actualizar un cliente
const updateContrato = async (id, contratoData) =>{
    try {
        const num_contrato = id.id;
        const client = await pool.connect();
        
        const query = `UPDATE contrato SET ${Object.keys(contratoData).map(key => `${key} = '${contratoData[key]}'`).join(', ')} WHERE num_contrato = $1 RETURNING *`;
        const values = [num_contrato];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error(err);
    }
}

const getContratos = async() => {
    try {
        const result = await pool.query("SELECT * FROM contrato");
        return result.rows;
    } catch (error) {
        console.log("Error Get Contratos: "+error);
        throw error;
    }
}

const getContratoById = async(id) => {
    const query = 'SELECT * FROM contrato WHERE num_contrato = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0]
}

//*************** TODOS LOS CLIENTES CON PRE-CONTRATO, CON INSTALACION PENDIENTE *****************//
const getContratosSinInsta = async() => {
    try {
        const result = await pool.query("select dc.num_contrato, dc.diapago, to_char(dc.fecha_contrato, 'DD/MM/YYYY') as fecha_contrato, to_char(dc.fechaprog_instalacion, 'DD/MM/YYYY') as fechaprog_instalacion, dc.observacion_contrato, dc.estadoc_instalacion, pl.nombreplan, cl.dnicliente, cl.apellidocli, nombrecli, cl.distritocli, cl.direccioncli, cl.telefonocli from contrato as dc INNER JOIN cliente as cl on dc.cliente_dnicliente=cl.dnicliente INNER JOIN planes as pl on dc.planes_idplanes=pl.idplanes WHERE dc.estadoc_instalacion=1");
        return result.rows;
    } catch (error) {
        console.log("Error Get Contratos: "+error);
        throw error;
    }
}

//******* TODOS LOS CLIENTES CON CONTRATO Y CON INSTALACIÓN ******/
const getContratosConInsta = async() => {
    try {
        const result = await pool.query("select dc.num_contrato, dc.diapago, dc.observacion_contrato, to_char(dc.fecha_contrato, 'DD/MM/YYYY') as fecha_contrato, to_char(dc.fechaprog_instalacion, 'DD/MM/YYYY') as fechaprog_instalacion, pl.nombreplan, pl.precioplan, pl.velocidadplan, dc.instalacion_idinstalacion, cl.dnicliente, cl.nombrecli, cl.apellidocli, cl.distritocli, cl.direccioncli, cl.telefonocli, to_char(cl.fecha_nacimiento, 'DD/MM/YYYY') as fecha_nacimiento , to_char(it.fechainstalacion, 'DD/MM/YYYY') as fechainstalacion, it.geolocalizacion, it.user_create, it.fecha_create, it.observacion_instalacion, it.caja_instalacion, im.idimagen, im.nombreimg, dc.estadoc_instalacion, ei.nombre_estadoinstalacion, dc.estado_servicio, es.nombre_estado from contrato as dc INNER JOIN cliente as cl on dc.cliente_dnicliente=cl.dnicliente INNER JOIN planes as pl on dc.planes_idplanes=pl.idplanes INNER JOIN estadoinstalacion as ei on dc.estadoc_instalacion=ei.id_estadoinstalacion INNER JOIN instalacion as it on dc.instalacion_idinstalacion=it.idinstalacion INNER JOIN imagen as im on it.imagen_idimagen=im.idimagen INNER JOIN estado as es on dc.estado_servicio=es.id_estado");
        return result.rows;
    } catch (error) {
        console.log("Error Get Contratos: "+error);
        throw error;
    }
}

//*************** TODOS LOS CONTRATOS, CON INSTALACION PENDIENTE E INSTALADOS **/
const getContratosAllInsta = async() => {
    try {
        const result = await pool.query("select dc.num_contrato, dc.cliente_dnicliente, dc.estadoc_instalacion, dc.diapago, dc.fecha_contrato, fechaprog_instalacion, dc.observacion_contrato, pl.nombreplan, cl.apellidocli, nombrecli, cl.distritocli, cl.direccioncli, cl.telefonocli from contrato as dc INNER JOIN cliente as cl on dc.cliente_dnicliente=cl.dnicliente INNER JOIN planes as pl on dc.planes_idplanes=pl.idplanes");
        return result.rows;
    } catch (error) {
        console.log("Error Get Contratos: "+error);
        throw error;
    }
}




module.exports = {
    createContrato, updateContrato, getContratos, getContratoById, getContratosAllInsta, getContratosConInsta, getContratosSinInsta
}