const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createInstalacion = async(Data) => {
    
    const { num_contrato, ordentrabajo_idordentrabajo, planactual_idplanes, clienteactual_dnicliente, fecha_inicio_contrato, condicion_equipo, tipo_equipo, cobro_equipo, cobro_instalacion, comentario_instalacion, caja_instalacion, splitter_instalacion, user_mk, estado_servicio, user_create, fecha_proximo_pago, ciclo_facturacion, dia_pago, latitud, longitud} = Data;
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO instalacion_contrato(num_contrato, ordentrabajo_idordentrabajo, planactual_idplanes, clienteactual_dnicliente, fecha_inicio_contrato, condicion_equipo, tipo_equipo, cobro_equipo, cobro_instalacion, comentario_instalacion, caja_instalacion, splitter_instalacion, user_mk, estado_servicio, user_create, fecha_proximo_pago, ciclo_facturacion, dia_pago, latitud, longitud) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING *';
        const values = [num_contrato, ordentrabajo_idordentrabajo, planactual_idplanes, clienteactual_dnicliente, fecha_inicio_contrato, condicion_equipo, tipo_equipo, cobro_equipo, cobro_instalacion, comentario_instalacion, caja_instalacion, splitter_instalacion, user_mk, estado_servicio, user_create, fecha_proximo_pago, ciclo_facturacion, dia_pago, latitud, longitud];
        const result = await client.query(query, values);
        console.log("SOY instalacion_contrato MODEL")
        console.log(result.rows)
        return result.rows[0];
    } catch (error) {
        console.log("Error creating instalacion_contrato: "+error);
        throw error;
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
};

// Función para actualizar un PLAN
const updateInstalacion = async (id, Data) =>{
    const client = await pool.connect(); // Adquiriendo conexión
    try {
        const num_contrato = id.id;
        const query = `UPDATE instalacion_contrato SET ${Object.keys(Data).map(key => `${key} = '${Data[key]}'`).join(', ')} WHERE num_contrato = $1 RETURNING *`;
        const values = [num_contrato];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error en updateInstalacion:",err);
        throw err; //Re-lanzar el error para manejarlo en el controlador
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
};

const getInstalaciones = async() => {
    try {
        const result = await pool.query("SELECT * FROM instalacion_contrato");
        return result.rows;
    } catch (error) {
        console.log("Error Get Instalacion_contratos: "+error);
        throw error;
    }
}

const getInstalacionById = async(id) => {
    const query = 'SELECT * FROM instalacion_contrato WHERE num_contrato = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0]
}

//******* TODOS LOS CLIENTES ACTIVOS Y SUSPENDIDOS ******/
const getInstalacionesAll = async() => {
    try {
        const result = await pool.query("select ic.num_contrato, ot.id_ordentrabajo, ot.clienteinicial_dnicliente, ic.clienteactual_dnicliente, ic.user_mk, cl.nombrecli, cl.apellidocli, cl.provinciacli, cl.distritocli, cl.direccioncli, cl.referenciacli, cl.geolocalizacion, cl.sedecli, ic.latitud, ic.longitud, cl.telefonocli, cl.telefonocli2, ot.planinicial_idplanes, ic.planactual_idplanes, ic.user_mk, pl.nombreplan, pl.descplan, pl.precioplan, pl.velocidadplan, to_char(ot.fecha_create, 'DD/MM/YYYY') as fecha_ot, to_char(ic.fecha_inicio_contrato, 'DD/MM/YYYY') as fecha_inicio_contrato, ic.user_create as tecnico_instalador, to_char(ic.fecha_create, 'DD/MM/YYYY') as fecha_instalacion, ic.comentario_instalacion, ic.caja_instalacion, ic.splitter_instalacion, ic.user_mk, ic.estado_servicio, es.nombre_estado, ic.condicion_equipo, ic.tipo_equipo, ic.cobro_equipo, ic.cobro_instalacion, ic.nombreimg_contrato, ic.ciclo_facturacion, ic.fecha_proximo_pago, ic.fecha_ultimo_pago, ic.dia_pago, ic.nombreimg_caja_antes, ic.nombreimg_potencia_antes, ic.nombreimg_caja_despues, ic.nombreimg_potencia_despues, ic.nombreimg_instalacion_interna, ic.nombreimg_potencia_interna, ic.nombreimg_casa, sd.nombre_sede from instalacion_contrato as ic INNER JOIN ordentrabajo as ot on ic.ordentrabajo_idordentrabajo=ot.id_ordentrabajo INNER JOIN cliente as cl on ic.clienteactual_dnicliente=cl.dnicliente INNER JOIN planes as pl on ic.planactual_idplanes=pl.idplanes INNER JOIN estado as es on ic.estado_servicio=es.id_estado INNER JOIN sedes as sd on cl.sedecli=sd.id_sede WHERE es.nombre_estado='Activo' OR es.nombre_estado='Suspendido'");
        return result.rows;
    } catch (error) {
        console.log("Error Get Instalaciones All: "+error);
        throw error;
    }
}
//******* TODOS LOS CLIENTES ALL ******/
const getInstalacionesAll2 = async() => {
    try {
        const result = await pool.query("select ic.num_contrato, ot.id_ordentrabajo, ot.clienteinicial_dnicliente, ic.clienteactual_dnicliente, cl.nombrecli, cl.apellidocli, cl.provinciacli, cl.distritocli, cl.direccioncli, cl.referenciacli, cl.geolocalizacion, cl.sedecli, cl.telefonocli, cl.telefonocli2, ot.planinicial_idplanes, ic.planactual_idplanes, ic.user_mk, pl.nombreplan, pl.descplan, pl.precioplan, pl.velocidadplan, to_char(ot.fecha_create, 'DD/MM/YYYY') as fecha_ot, ic.user_create as tecnico_instalador, to_char(ic.fecha_create, 'DD/MM/YYYY') as fecha_instalacion, to_char(ic.fecha_inicio_contrato, 'DD/MM/YYYY') as fecha_inicio_contrato, ic.comentario_instalacion, ic.caja_instalacion, ic.estado_servicio, es.nombre_estado, ic.condicion_equipo, ic.tipo_equipo, ic.cobro_equipo, ic.cobro_instalacion,  ic.nombreimg_contrato, ic.nombreimg_casa, ic.nombreimg_caja_antes, ic.nombreimg_potencia_antes, ic.nombreimg_caja_despues, ic.nombreimg_potencia_despues, ic.nombreimg_instalacion_interna, ic.nombreimg_potencia_interna, ic.ciclo_facturacion, ic.fecha_proximo_pago, ic.fecha_ultimo_pago, ic.dia_pago from instalacion_contrato as ic INNER JOIN ordentrabajo as ot on ic.ordentrabajo_idordentrabajo=ot.id_ordentrabajo INNER JOIN cliente as cl on ic.clienteactual_dnicliente=cl.dnicliente INNER JOIN planes as pl on ic.planactual_idplanes=pl.idplanes INNER JOIN estado as es on ic.estado_servicio=es.id_estado");
        return result.rows;
    } catch (error) {
        console.log("Error Get Instalaciones All2: "+error);
        throw error;
    }
}


// Función para actualizar IMAGEN 1 CONTRATO
const updateImagen = async (id, Data) =>{
    const client = await pool.connect();
    try {
        const num_contrato = id.id;
        const query = `UPDATE instalacion_contrato SET ${Object.keys(Data).map(key => `${key} = '${Data[key]}'`).join(', ')} WHERE num_contrato = $1 RETURNING *`;
        const values = [num_contrato];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error en updateImagen",err);
        throw err;
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
};

module.exports = {
    createInstalacion, updateInstalacion, getInstalaciones, getInstalacionById, getInstalacionesAll, getInstalacionesAll2, updateImagen
}