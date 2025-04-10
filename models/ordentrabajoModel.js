const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createOrdentrabajo = async(ordentrabajoData) => {
    
    const { planinicial_idplanes, clienteinicial_dnicliente, diapago, fechaprog_instalacion, horario_instalacion, indicacion_instalacion, costo_instalacion, estado_instalacion, user_create } = ordentrabajoData;

    try {
        const client = await pool.connect();
        const query = 'INSERT INTO ordentrabajo(planinicial_idplanes, clienteinicial_dnicliente, diapago, fechaprog_instalacion, horario_instalacion, indicacion_instalacion, costo_instalacion, estado_instalacion, user_create) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
        const values = [planinicial_idplanes, clienteinicial_dnicliente, diapago, fechaprog_instalacion, horario_instalacion, indicacion_instalacion, costo_instalacion, estado_instalacion, user_create];
        const result = await client.query(query, values);
        client.release();
        console.log("SOY LA ORDENTRABAJO MODEL")
        console.log(result.rows)
        return result.rows[0];
        
    } catch (error) {
        console.log("Error creating OrdenTrabajo: "+error);
        throw error;
    }
};

// Función para actualizar un cliente
const updateOrdentrabajo = async (id, contratoData) =>{
    try {
        const id_ordentrabajo = id.id;
        const client = await pool.connect();
        
        const query = `UPDATE ordentrabajo SET ${Object.keys(contratoData).map(key => `${key} = '${contratoData[key]}'`).join(', ')} WHERE id_ordentrabajo = $1 RETURNING *`;
        const values = [id_ordentrabajo];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error(err);
    }
}

const getOrdentrabajo = async() => {
    try {
        const result = await pool.query("SELECT * FROM ordentrabajo");
        return result.rows;
    } catch (error) {
        console.log("Error Get OrdenTrabajo: "+error);
        throw error;
    }
}

const getOrdentrabajoById = async(id) => {
    const query = 'SELECT * FROM ordentrabajo WHERE id_ordentrabajo = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0]
}

//*************** TODOS LOS CLIENTES CON OT, INSTALACION PENDIENTE *****************//
const getOrdenesSinInsta = async() => {
    try {
        const result = await pool.query("select ot.id_ordentrabajo, ot.planinicial_idplanes, ot.clienteinicial_dnicliente, ot.diapago, to_char(ot.fechaprog_instalacion, 'YYYY-MM-DD') as fechaprog_instalacion, ot.horario_instalacion, ot.indicacion_instalacion, ot.costo_instalacion, to_char(ot.fecha_create, 'DD/MM/YYYY') as fecha_ot, pl.nombreplan, cl.dnicliente, cl.apellidocli, nombrecli, cl.provinciacli, cl.distritocli, cl.direccioncli, cl.telefonocli, cl.referenciacli, cl.geolocalizacion, ot.estado_instalacion, ei.nombre_estadoinstalacion from ordentrabajo as ot INNER JOIN cliente as cl on ot.clienteinicial_dnicliente=cl.dnicliente INNER JOIN planes as pl on ot.planinicial_idplanes=pl.idplanes INNER JOIN estadoinstalacion as ei on ot.estado_instalacion=ei.id_estadoinstalacion WHERE ot.estado_instalacion=1");
        return result.rows;
    } catch (error) {
        console.log("Error Get Ordenes: "+error);
        throw error;
    }
}

//******* TODOS LOS CLIENTES CON OT Y CON INSTALACIÓN ******/
const getOrdenesConInsta = async() => {
    try {
        const result = await pool.query("select ic.num_contrato, ic.user_create as tecnico, ic.condicion_equipo, ic.tipo_equipo, ic.cobro_equipo, ic.cobro_instalacion, ic.comentario_instalacion, ic.caja_instalacion, ic.nombreimg_contrato, ic.nombreimg_casa, ic.nombreimg_caja_antes, ic.nombreimg_potencia_antes, ic.nombreimg_caja_despues, ic.nombreimg_potencia_despues, ic.nombreimg_instalacion_interna, ic.nombreimg_potencia_interna, to_char(ic.fecha_create, 'DD/MM/YYYY') as fecha_instalacion, ot.id_ordentrabajo, ot.planinicial_idplanes, ot.clienteinicial_dnicliente, ot.diapago, ot.horario_instalacion, ot.indicacion_instalacion, ot.costo_instalacion, to_char(ot.fecha_create, 'DD/MM/YYYY') as fecha_ot,  to_char(ot.fechaprog_instalacion, 'DD/MM/YYYY') as fechaprog_instalacion, ot.indicacion_instalacion, pl.nombreplan, cl.dnicliente, cl.apellidocli, nombrecli, cl.provinciacli, cl.distritocli, cl.direccioncli, cl.telefonocli, cl.referenciacli, cl.geolocalizacion, ic.longitud, ic.latitud from instalacion_contrato as ic INNER JOIN ordentrabajo as ot on ic.ordentrabajo_idordentrabajo=ot.id_ordentrabajo INNER JOIN cliente as cl on ot.clienteinicial_dnicliente=cl.dnicliente INNER JOIN planes as pl on ot.planinicial_idplanes=pl.idplanes WHERE ot.estado_instalacion=2");
        return result.rows;
    } catch (error) {
        console.log("Error Get Contratos: "+error);
        throw error;
    }
}


module.exports = {
    createOrdentrabajo, updateOrdentrabajo, getOrdentrabajo, getOrdentrabajoById, getOrdenesConInsta, getOrdenesSinInsta
}