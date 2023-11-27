const sql = require("./db.js");

// constructor
const Tere = function(usuarios) {
  this.usuario = usuarios.usuario;
  this.contraseña=usuarios.contraseña;
  this.nombre=usuarios.nombre;
  this.apellidos=usuarios.apellidos;
  this.telefono=usuarios.telefono;
  this.correo=usuarios.correo;
};

Tere.create = (newTere, result) => {
  console.log("entro");
  sql.query("INSERT INTO usuarios SET ?", newTere, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { usuario: res.insertUsuario, ...newTere });
    result(null, { usuario: res.insertUsuario, ...newTere });
  });
};

Tere.findById = (usuario, result) => {
  sql.query(`SELECT * FROM usuarios WHERE usuario = ?`, usuario, (err, res) => {
   
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found usuarios: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Tere.getAll = (usuario, result) => {
  let query = "SELECT * FROM usuarios";

  if (usuario) {
    query += ` WHERE usuario LIKE '%${usuario}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("usuarios: ", res);
    result(null, res);
  });
};
//aqui obtiene todos los tutoriales publicados
Tere.getAllPublished = result => {
  sql.query("SELECT * FROM usuarios WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Tere.updateById = (usuario, usuarios, result) => {
  sql.query(
    "UPDATE usuarios SET nombre = ?, apellidos = ?, telefono = ? correo= ? WHERE id = ?",
    [usuarios.nombre, usuarios.apellidos, usuarios.telefono,usuarios.correo, usuario],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated usuario: ", { usuario: usuario, ...usuario });
      result(null, { usuario: usuario, ...usuario });
    }
  );
};

Tere.remove = (usuario, result) => {
  sql.query("DELETE FROM usuarios WHERE usuario = ?", usuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user : ", usuario);
    result(null, res);
  });
};

Tere.removeAll = result => {
  sql.query("DELETE FROM usuarios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} usuarios`);
    result(null, res);
  });
};

module.exports = Tere;
