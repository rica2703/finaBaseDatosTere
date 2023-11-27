const TereV = require("../models/ventas.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const Ventas = new TereV({
    conceptoPago: req.body.conceptoPago,
    urlImagen:req.body.urlImagen,
    codigoProductoVendido: req.body.codigoProductoVendido,
    nombreProducto:req.body.nombreProducto,
    especificaciones:req.body.especificaciones,
    nombreUsuario:req.body.nombreUsuario,
    fechaCompra:req.body.fechaCompra,
    datosEnvio:req.body.datosEnvio,
    estado:req.body.estado,
    envioCosto:req.body.envioCosto,
    costoProducto:req.body.costoProducto,
    total: req.body.total || false
  });

  // Save Tutorial in the database
  TereV.create(Ventas, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tere."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  TereV.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single Product by code
exports.findOne = (req, res) => {
  TereV.findById(req.params.conceptoPago, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found TereBD with id ${req.params.conceptoPago}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving TereBD with id " + req.params.conceptoPago
        });
      }
    } else res.send(data);
  });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  TereV.updateByCodigo(
    req.params.conceptoPago,
    new TereV(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found TereBD with codigo ${req.params.conceptoPago}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating TereBD with codigo " + req.params.conceptoPago
          });
        }
      } else res.send("hecho");
    }
  );
};

// Delete a product with the specified code in the request
exports.delete = (req, res) => {
  TereV.remove(req.params.conceptoPago, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found TereBD with id ${req.params.conceptoPago}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete TereBD with user " + req.params.conceptoPago
        });
      }
    } else res.send({ message: `TereBD was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  TereV.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All TereBD were deleted successfully!` });
  });
};
