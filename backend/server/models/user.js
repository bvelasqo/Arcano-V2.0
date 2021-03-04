const db = require('../utils/database');

module.exports = class Usuario {

    
    constructor(documento, nombre, usuario, contrasena, correo, fecha_nacimiento, genero, codigoPersonal, pais) {
        this.documento = documento;
        this.nombre = nombre;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.correo = correo;
        this.fecha_nacimiento = fecha_nacimiento;
        this.genero = genero;
        this.codigoPersonal = codigoPersonal;
        this.pais = pais;
        
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
            ' INSERT INTO usuarios(documento, nombre, usuario, contrasena, correo, fecha_nacimiento, id_genero, codigoPersonal, id_pais) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [user.documento, user.nombre, user.usuario, user.contrasena, user.correo, user.fecha_nacimiento, user.genero, user.codigoPersonal, user.pais]
        );
    }
};