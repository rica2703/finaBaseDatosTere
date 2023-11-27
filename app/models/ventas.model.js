const sql = require("./db.js");

// constructor
const TereV = function(ventas) {
  this.conceptoPago = ventas.conceptoPago;
  this.urlImagen=ventas.urlImagen;
  this.codigoProductoVendido=ventas.codigoProductoVendido;
  this.nombreProducto=ventas.nombreProducto;
  this.especificaciones=ventas.especificaciones;
  this.nombreUsuario=ventas.nombreUsuario;
  this.fechaCompra=ventas.fechaCompra;
  this.datosEnvio=ventas.datosEnvio;
  this.estado=ventas.estado;
  this.envioCosto=ventas.envioCosto;
  this.costoProducto=ventas.costoProducto;
  this.total=ventas.total;
};

TereV.create = (newTere, result) => {
  sql.query("INSERT INTO ventas SET ?", newTere, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created venta: ", { venta: res.insertVenta, ...newTere });
    result(null, { venta: res.insertVenta, ...newTere });
  });
};

TereV.findById = (conceptoPago, result) => {
  sql.query(`SELECT * FROM ventas WHERE conceptoPago = ?`, conceptoPago, (err, res) => {
   
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found venta: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

TereV.getAll = (conceptoPago, result) => {
  let query = "SELECT * FROM ventas";

  if (conceptoPago) {
    query += ` WHERE codigo LIKE '%${conceptoPago}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("venta: ", res);
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

TereV.updateByCodigo = (conceptoPago, ventas, result) => {
  sql.query(
    "UPDATE ventas SET urlImagen=?, codigoProductoVendido = ?, nombreProducto = ?, especificaciones=?,nombreUsuario=?,fechaCompra=?,datosEnvio=?,estado=?,envioCosto=?,costoProducto=?,total=? WHERE conceptoPago = ?",
    [ventas.urlImagen,ventas.codigoProductoVendido,ventas.nombreProducto,ventas.especificaciones,ventas.nombreUsuario,ventas.fechaCompra,ventas.datosEnvio,ventas.estado,ventas.envioCosto,ventas.costoProducto,ventas.total, conceptoPago],
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

      console.log("updated ventas: ", { conceptoPago: conceptoPago, ...conceptoPago});
      result(null, { ventas: conceptoPago, ...conceptoPago });
    }
  );
};

TereV.remove = (conceptoPago, result) => {
  sql.query("DELETE FROM ventas WHERE conceptoPago = ?", conceptoPago, (err, res) => {
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

    console.log("deleted venta : ", conceptoPago);
    result(null, res);
  });
};

TereV.removeAll = result => {
  sql.query("DELETE FROM ventas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} ventas`);
    result(null, res);
  });
};

module.exports = TereV;
