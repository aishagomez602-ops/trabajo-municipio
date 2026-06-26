const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

conexion.connect((error) => {
    if (error) {
        console.error('Error de conexión a la base de datos:', error.message);
        // Reintentar conexión después de 5 segundos
        setTimeout(() => {
            conexion.connect();
        }, 5000);
    } else {
        console.log('Conectado exitosamente a la base de datos');
    }
});

// Manejar desconexiones inesperadas
conexion.on('error', (error) => {
    console.error('Error en la conexión de BD:', error.message);
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Reconectando...');
        conexion.connect();
    }
});

module.exports = conexion;
