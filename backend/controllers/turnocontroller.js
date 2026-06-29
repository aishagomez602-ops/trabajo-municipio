const servicio = require("./turnoservice");

/* ==========================================
   LICENCIA NUEVA
========================================== */

exports.obtenerLicencias = (req, res) => {

    servicio.obtenerLicencias((err, datos) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al obtener las licencias",
                error: err
            });
        }

        res.json(datos);

    });

};

exports.crearLicencia = (req, res) => {

    servicio.crearLicencia(req.body, (err, resultado) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al crear la licencia",
                error: err
            });
        }

        res.status(201).json({
            mensaje: "Turno para Licencia Nueva registrado correctamente",
            id: resultado.insertId
        });

    });

};

exports.eliminarLicencia = (req, res) => {

    servicio.eliminarLicencia(req.params.id, (err) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al eliminar",
                error: err
            });
        }

        res.json({
            mensaje: "Turno eliminado correctamente"
        });

    });

};



/* ==========================================
   RENOVACIONES
========================================== */

exports.obtenerRenovaciones = (req, res) => {

    servicio.obtenerRenovaciones((err, datos) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al obtener renovaciones",
                error: err
            });
        }

        res.json(datos);

    });

};

exports.crearRenovacion = (req, res) => {

    servicio.crearRenovacion(req.body, (err, resultado) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al crear renovación",
                error: err
            });
        }

        res.status(201).json({
            mensaje: "Renovación registrada correctamente",
            id: resultado.insertId
        });

    });

};

exports.eliminarRenovacion = (req, res) => {

    servicio.eliminarRenovacion(req.params.id, (err) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al eliminar renovación",
                error: err
            });
        }

        res.json({
            mensaje: "Renovación eliminada"
        });

    });

};



/* ==========================================
   ESTUDIOS MÉDICOS
========================================== */

exports.obtenerEstudios = (req, res) => {

    servicio.obtenerEstudios((err, datos) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al obtener estudios",
                error: err
            });
        }

        res.json(datos);

    });

};

exports.crearEstudio = (req, res) => {

    servicio.crearEstudio(req.body, (err, resultado) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al crear estudio",
                error: err
            });
        }

        res.status(201).json({
            mensaje: "Estudio médico registrado correctamente",
            id: resultado.insertId
        });

    });

};

exports.eliminarEstudio = (req, res) => {

    servicio.eliminarEstudio(req.params.id, (err) => {

        if (err) {
            return res.status(500).json({
                mensaje: "Error al eliminar estudio",
                error: err
            });
        }

        res.json({
            mensaje: "Estudio eliminado correctamente"
        });

    });

};