const sql = require("./db.js");

// constructor
const Tere = function(productos) {
  this.codigoProducto = productos.codigoProducto;
  this.nombreP=productos.nombreP;
  this.urlImagen=productos.urlImagen;
  this.descripcion=productos.descripcion;
  this.precioUnitario=productos.precioUnitario;
};

Tere.create = (newTere, result) => {
  sql.query("INSERT INTO productos SET ?", newTere, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created products: ", { codigo: res.insertCodigo, ...newTere });
    result(null, { codigo: res.insertCodigo, ...newTere });
  });
};

Tere.findById = (codigo, result) => {
  sql.query(`SELECT * FROM productos WHERE codigoProducto = ?`, codigo, (err, res) => {
   
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

Tere.getAll = (codigo, result) => {
  let query = "SELECT * FROM productos";

  if (codigo) {
    query += ` WHERE codigoProducto LIKE '%${codigo}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("productos: ", res);
    result(null, res);
  });
};
//aqui obtiene todos los tutoriales publicados
// Tere.getAllPublished = result => {
//   sql.query("SELECT * FROM usuarios WHERE published=true", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("tutorials: ", res);
//     result(null, res);
//   });
// };

Tere.updateById = (codigoProducto, productos, result) => {
  sql.query(
    "UPDATE productos SET nombreP = ?,urlImagen=?, descripcion = ?, precioUnitario= ? WHERE codigoProducto = ?",
    [productos.nombreP,productos.urlImagen ,productos.descripcion,productos.precioUnitario,codigoProducto],
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

      console.log("updated product: ", { codigoProducto: codigoProducto, ...codigoProducto });
      result(null, { codigoProducto: codigoProducto, ...codigoProducto });
    }
  );
};

Tere.remove = (codigo, result) => {
  sql.query("DELETE FROM productos WHERE codigoProducto = ?", codigo, (err, res) => {
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

    console.log("deleted product : ", codigo);
    result(null, res);
  });
};

Tere.removeAll = result => {
  sql.query("DELETE FROM productos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} productos`);
    result(null, res);
  });
};

module.exports = Tere;
