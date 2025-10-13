const { Pool } = require('pg');
const pool = require('../database/connectiondb');
const bcrypt = require('bcrypt');

const createUser = async(userData) => {
    const client = await pool.connect();
    const { id_user, nombre_user, apellido_user, perfil_user, password_user, estado, sede_id } = userData;
    const hashedPassword = await bcrypt.hash(password_user, 10);
    try {
        const query = 'INSERT INTO usuarios(id_user, nombre_user, apellido_user, perfil_user, password_user, estado, sede_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [id_user, nombre_user, apellido_user, perfil_user, hashedPassword, estado, sede_id];
        const result = await client.query(query, values);
        console.log("SOY EL USERMODEL")
        console.log(result.rows)
        return result.rows[0];
    } catch (error) {
        console.log("Error creating user: "+error);
        throw error;
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
};

//ACTUALIZAR CONTRASEÑA USUARIO
const updatePassword = async (id, userPassword) => {
    const client = await pool.connect();
    const { password_user } = userPassword;
    const id_user = id.id;
    const hashedPassword = await bcrypt.hash(password_user, 10);
    try {
        const query = 'UPDATE usuarios SET password_user = $1 WHERE id_user = $2 RETURNING *';
        const values = [hashedPassword, id_user];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log("Error updating user: "+error);
        throw error;
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
}

// Función para actualizar un usuario
const updateUser = async (id, userData) =>{
    const client = await pool.connect();
    try {
        const id_user = id.id;
        const query = `UPDATE usuarios SET ${Object.keys(userData).map(key => `${key} = '${userData[key]}'`).join(', ')} WHERE id_user = $1 RETURNING *`;
        const values = [id_user];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error en updateUser", err);
        throw err;
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
}

const getUsers = async() => {
    try {
        const result = await pool.query(`
            SELECT u.*, s.nombre_sede as sede_nombre 
            FROM usuarios u
            LEFT JOIN sedes s ON u.sede_id = s.id_sede 
            WHERE 1=1
            `);
        return result.rows;
    } catch (error) {
        console.log("Error Get Users: "+error);
        throw error;
    }
}

const getUserById = async(id) => {
    const query = 'SELECT * FROM usuarios WHERE id_user = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0]
}

module.exports = {
    createUser, getUserById, getUsers, updateUser, updatePassword
}