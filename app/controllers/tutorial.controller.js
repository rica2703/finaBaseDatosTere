const Tere = require("../models/tutorial.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const tutorial = new Tere({
    usuario:req.body.usuario,
    contraseña: req.body.contraseña,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos, 
    telefono:req.body.telefono,
    correo:req.body.correo || false
  });

  // Save Tutorial in the database
  Tere.create(tutorial, (err, data) => {
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

  Tere.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single user by user
exports.findOne = (req, res) => {
  Tere.findById(req.params.usuario, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found TereBD with id ${req.params.usuario}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving TereBD with id " + req.params.usuario
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tere.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
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

  Tere.updateById(
    req.params.id,
    new Tere(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found TereBD with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating TereBD with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  Tere.remove(req.params.usuario, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found TereBD with id ${req.params.usuario}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete TereBD with user " + req.params.usuario
        });
      }
    } else res.send({ message: `TereBD was deleted successfully! el ultimo else` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tere.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All TereBD were deleted successfully!` });
  });
};
