const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const config = require('./db_config.json');

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    multipleStatements: true
});

connection.connect((error) => {
    if (error) throw error;
    console.log('Successfully connected to the database.');

    const sqlScript = fs.readFileSync(path.join(__dirname, 'db.sql'), 'utf8');
    connection.query(sqlScript, (error) => {
        if (error) throw error;
        console.log('Database setup completed.');
    });
});

function isUnique(table, column, value) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${table} WHERE ${column} = ?`;
        connection.query(query, value, (error, results) => {
            if (error) reject(error);
            
            resolve(results.length === 0);
        });
    });
}

function find(table, column, value) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${table} WHERE ${column} = ?`;
        connection.query(query, value, (error, results) => {
            if (error) reject(error);
            resolve(results[0]);
        });
    });
}

function save(table, data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${table} SET ?`;
        connection.query(query, data, (error) => {
            if (error) reject(error);
            resolve();
        });
    });
}

module.exports = { isUnique, save, find };