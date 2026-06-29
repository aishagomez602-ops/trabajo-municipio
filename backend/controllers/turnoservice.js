const conexion = require("../database");

/* =====================================
   LICENCIA NUEVA
===================================== */

const obtenerLicencias = (callback) => {
    conexion.query(
        "SELECT * FROM licencia_nueva ORDER BY fecha_turno",
        callback
    );
};

const crearLicencia = (datos, callback) => {

    const sql = `
        INSERT INTO licencia_nueva
        (
            nombre,
            apellido,
            dni,
            telefono,
            domicilio,
            categoria,
            fecha_turno,
            hora_turno,
            estado
        )
        VALUES(?,?,?,?,?,?,?,?,?)
    `;

    conexion.query(sql, [

        datos.nombre,
        datos.apellido,
        datos.dni,
        datos.telefono,
        datos.domicilio,
        datos.categoria,
        datos.fecha_turno,
        datos.hora_turno,
        "Pendiente"

    ], callback);

};

const eliminarLicencia = (id, callback) => {

    conexion.query(

        "DELETE FROM licencia_nueva WHERE id=?",

        [id],

        callback

    );

};


/* =====================================
   RENOVACIONES
===================================== */

const obtenerRenovaciones = (callback) => {

    conexion.query(

        "SELECT * FROM renovaciones ORDER BY fecha_turno",

        callback

    );

};

const crearRenovacion = (datos, callback) => {

    const sql = `
        INSERT INTO renovaciones
        (
            nombre,
            apellido,
            dni,
            numero_licencia,
            fecha_vencimiento,
            fecha_turno,
            hora_turno,
            estado
        )
        VALUES(?,?,?,?,?,?,?,?)
    `;

    conexion.query(sql, [

        datos.nombre,
        datos.apellido,
        datos.dni,
        datos.numero_licencia,
        datos.fecha_vencimiento,
        datos.fecha_turno,
        datos.hora_turno,
        "Pendiente"

    ], callback);

};

const eliminarRenovacion = (id, callback) => {

    conexion.query(

        "DELETE FROM renovaciones WHERE id=?",

        [id],

        callback

    );

};



/* =====================================
   ESTUDIOS MÉDICOS
===================================== */

const obtenerEstudios = (callback) => {

    conexion.query(

        "SELECT * FROM estudios_medicos ORDER BY fecha_turno",

        callback

    );

};

const crearEstudio = (datos, callback) => {

    const sql = `
        INSERT INTO estudios_medicos
        (
            nombre,
            apellido,
            dni,
            telefono,
            tipo_estudio,
            fecha_turno,
            hora_turno,
            estado
        )
        VALUES(?,?,?,?,?,?,?,?)
    `;

    conexion.query(sql, [

        datos.nombre,
        datos.apellido,
        datos.dni,
        datos.telefono,
        datos.tipo_estudio,
        datos.fecha_turno,
        datos.hora_turno,
        "Pendiente"

    ], callback);

};

const eliminarEstudio = (id, callback) => {

    conexion.query(

        "DELETE FROM estudios_medicos WHERE id=?",

        [id],

        callback

    );

};



module.exports = {

    obtenerLicencias,
    crearLicencia,
    eliminarLicencia,

    obtenerRenovaciones,
    crearRenovacion,
    eliminarRenovacion,

    obtenerEstudios,
    crearEstudio,
    eliminarEstudio

};