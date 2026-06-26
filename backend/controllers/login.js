const conexion = require("../database");

function login(data, callback) {
    const { email, contraseña } = data;
    
    if (!email || !contraseña) {
        return callback(new Error("Email y contraseña son requeridos"));
    }
    
    if (!email.includes("@")) {
        return callback(new Error("Email inválido"));
    }

    conexion.query(
        "SELECT id, email, contraseña, rol FROM cuenta WHERE email = ?",
        [email],
        callback
    );
}

function registro(data, callback) {
    const { email, contraseña, rol } = data;
    
    if (!email || !contraseña || !rol) {
        return callback(new Error("Email, contraseña y rol son requeridos"));
    }
    
    if (!email.includes("@")) {
        return callback(new Error("Email inválido"));
    }
    
    if (contraseña.length < 6) {
        return callback(new Error("La contraseña debe tener mínimo 6 caracteres"));
    }
    
    if (!["admin", "usuario"].includes(rol)) {
        return callback(new Error("Rol inválido. Use 'admin' o 'usuario'"));
    }

    conexion.query(
        "INSERT INTO cuenta (email, contraseña, rol) VALUES (?, ?, ?)",
        [email, contraseña, rol],
        callback
    );
}

module.exports = {
    login,
    registro
};

