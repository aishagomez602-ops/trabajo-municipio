const express = require("express");

const verificarToken = require("../middleware/authMiddleware");
const verificarAdmin = require("../middleware/adminMiddleware");

const {
    buscarUsuarios,
    obtenerUsuarios,
    crearUsuario,
    eliminarUsuario,
    actualizarUsuario,
    login,
    registro
} = require("../controllers/controller");

const turno = require("../controllers/turnocontroller");

const router = express.Router();


/* ==========================================
   LOGIN
========================================== */

router.post("/login", login);
router.post("/registro", registro);


/* ==========================================
   USUARIOS
========================================== */

router.get(
    "/usuarios",
    verificarToken,
    verificarAdmin,
    obtenerUsuarios
);

router.get(
    "/usuarios/:id",
    verificarToken,
    verificarAdmin,
    buscarUsuarios
);

router.post(
    "/usuarios",
    verificarToken,
    verificarAdmin,
    crearUsuario
);

router.put(
    "/usuarios/:id",
    verificarToken,
    verificarAdmin,
    actualizarUsuario
);

router.delete(
    "/usuarios/:id",
    verificarToken,
    verificarAdmin,
    eliminarUsuario
);



/* ==========================================
   LICENCIA NUEVA
========================================== */

// Obtener todos los turnos
router.get(
    "/licencias",
    verificarToken,
    turno.obtenerLicencias
);

// Crear turno
router.post(
    "/licencias",
    verificarToken,
    turno.crearLicencia
);

// Eliminar turno
router.delete(
    "/licencias/:id",
    verificarToken,
    turno.eliminarLicencia
);



/* ==========================================
   RENOVACIONES
========================================== */

router.get(
    "/renovaciones",
    verificarToken,
    turno.obtenerRenovaciones
);

router.post(
    "/renovaciones",
    verificarToken,
    turno.crearRenovacion
);

router.delete(
    "/renovaciones/:id",
    verificarToken,
    turno.eliminarRenovacion
);



/* ==========================================
   ESTUDIOS MÉDICOS
========================================== */

router.get(
    "/estudios",
    verificarToken,
    turno.obtenerEstudios
);

router.post(
    "/estudios",
    verificarToken,
    turno.crearEstudio
);

router.delete(
    "/estudios/:id",
    verificarToken,
    turno.eliminarEstudio
);


module.exports = router;