import { QUERY } from '../db.js'

export const getClients = async() => {
    const {rows} = await QUERY ('SELECT * FROM clients_tb')
    return rows
}

export const createClient = async (clientData) => {
    const { name, email, job, rate, isactive } = clientData

    const { rows } = await QUERY (
        `INSERT INTO clients_tb (name, email, job, rate, isactive)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, email, job, rate, isactive]
    )

    return rows [0]
}

export const updateClient = async (clientId, clientData) => {
    const { name, email, job, rate, isactive } = clientData

    const { rows } = await QUERY (
        `UPDATE clients_tb
        SET name=$1, email=$2, job=$3, rate=$4, isactive=$5
        WHERE id=$6 RETURNING *`,
        [name, email, job, rate, isactive, clientId]
    )

    return rows [0]
}

export const deleteClient = async (clientId) => {
    const { rowCount } = await QUERY (
        `DELETE FROM clients_tb WHERE id=$1`,
        [clientId]
    )

    return rowCount > 0
}

export const searchClients = async (searchTerm) => {
    const { rows } = await QUERY (
        `SELECT * FROM clients_tb WHERE name ILIKE $1 OR email ILIKE $1 OR job ILIKE $1`,
        [`%${searchTerm}%`]
    )

    return rows
}