const usuarioservice = require("./service");
const loginservice = require("./login");
const bcrypt = require("bcrypt");
const auth = require("./auth");
const jwt = require("jsonwebtoken");
//CRUD USUARIOS
function buscarUsuarios(req, res) {
    const { id } = req.params;

    usuarioservice.buscarUsuarios({ id }, (err, results) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!results.length) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json(results[0]);
    });
}

function obtenerUsuarios(req, res) {
    usuarioservice.obtenerUsuarios((err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).json({ error: "Error al obtener usuarios de la base de datos" });
        }
        res.json(results);
    });
}

function crearUsuario(req, res) {
    const { nombre, apellido } = req.body;
    usuarioservice.crearUsuario({ nombre, apellido }, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(201).json({ mensaje: "usuario creado correctamente" });
        }
    });
}

function actualizarUsuario(req, res) {
    const { nombre, apellido } = req.body;
    const { id } = req.params;
    usuarioservice.actualizarUsuario(id, { nombre, apellido }, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ mensaje: "Usuario actualizado correctamente" });
        }
    });
}

function eliminarUsuario(req, res) {
    const { id } = req.params;
    usuarioservice.eliminarUsuario(id, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ mensaje: "usuario borrado correctamente" });
        }
    });
}
//FIN CRUD USUARIOS

//LOGIN
function login(req, res) {
    const { email, contraseña } = req.body;
    
    // Validación de entrada
    if (!email || !contraseña) {
        return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }
    
    loginservice.login({ email, contraseña }, (err, results) => {
        if (err) {
            console.error("Error en login BD:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (!results || results.length === 0) {
            return res.status(401).json({ error: "Email o contraseña incorrectos" });
        }

        const hashAlmacenado = results[0].contraseña;
        if (!hashAlmacenado) {
            return res.status(500).json({ error: "Error en los datos del usuario" });
        }

        bcrypt.compare(contraseña, hashAlmacenado, (err, resultado) => {
            if (err) {
                console.error("Error al comparar contraseña:", err);
                return res.status(500).json({ error: "Error al verificar contraseña" });
            }
            if (resultado) {
                const token = jwt.sign(
                    { id: results[0].id, email: results[0].email, rol: results[0].rol },
                    process.env.JWT_SECRET || "secreto",
                    { expiresIn: '24h' }
                );
                auth.setUsuario(results[0]);
                res.json({
                    mensaje: "Login exitoso",
                    token: token,
                    usuario: {
                        id: results[0].id,
                        email: results[0].email,
                        rol: results[0].rol
                    }
                });
            } else {
                res.status(401).json({ error: "Email o contraseña incorrectos" });
            }
        });
    });
}

function registro(req, res) {
    const { email, contraseña, rol } = req.body;
    
    // Validación de entrada
    if (!email || !contraseña || !rol) {
        return res.status(400).json({ error: "Email, contraseña y rol son requeridos" });
    }
    
    // Validar longitud de contraseña
    if (contraseña.length < 6) {
        return res.status(400).json({ error: "La contraseña debe tener mínimo 6 caracteres" });
    }
    
    // Encriptar contraseña
    bcrypt.hash(contraseña, 10, (err, hash) => {
        if (err) {
            console.error("Error al encriptar:", err);
            return res.status(500).json({ error: "Error al procesar el registro" });
        }
        loginservice.registro({ email, contraseña: hash, rol }, (err, results) => {
            if (err) {
                console.error("Error en registro BD:", err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: "El email ya está registrado" });
                }
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({ mensaje: "Registro exitoso" });
        });
    });
}
//FIN LOGIN






module.exports = {
    buscarUsuarios,
    obtenerUsuarios,
    crearUsuario,
    eliminarUsuario,
    actualizarUsuario,
    login,
    registro
};
