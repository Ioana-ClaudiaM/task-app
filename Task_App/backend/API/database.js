const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'parola',
    database: 'task_app',
    connectionLimit: 50,
    acquireTimeout: 1000000,
    waitForConnections: true,
    queueLimit: 0,
});

module.exports = { pool};