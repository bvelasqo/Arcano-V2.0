const db = require('../utils/database');

module.exports = class Usuario {

    
    constructor(documento, nombre, usuario, contrasena, correo, fecha_nacimiento, id_genero, codigoPersonal, id_pais) {
        this.documento = documento;
        this.nombre = nombre;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.correo = correo;
        this.fecha_nacimiento = fecha_nacimiento;
        this.id_genero = id_genero;
        this.codigoPersonal = codigoPersonal;
        this.id_pais = id_pais;
        
    }



    static findByUser(usuario) {
        return db.execute(
            'SELECT * FROM  usuarios WHERE usuario = ?', [usuario]
        );
    }
    static findByCode(code) {
        return db.execute(
            'SELECT * FROM  usuarios WHERE codigoPersonal = ?', [code]
        );
    }
    static findByDoc(documento) {
        return db.execute(
            'SELECT * FROM  usuarios WHERE documento = ?', [documento]
        );
    }
    
    static save(user) {
        
        return db.execute(
            ' INSERT INTO usuarios(documento, nombre, usuario, contrasena, correo, fecha_nacimiento, id_genero, codigoPersonal, id_pais) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [user.documento, user.nombre, user.usuario, user.contrasena, user.correo, user.fecha_nacimiento, user.id_genero, user.codigoPersonal, user.id_pais]
        );
    }
};