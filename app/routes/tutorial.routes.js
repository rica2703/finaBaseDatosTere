module.exports = app => {
  const tereBD = require("../controllers/tutorial.controller.js");
  const tereBD2 = require("../controllers/ventas.controller.js");
  const tereBD3 = require("../controllers/productos.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tereBD.create);

  // Retrieve all Tutorials
  router.get("/", tereBD.findAll);

  // Retrieve all USERS
  router.get("/usuario", tereBD.findAllPublished);

  // Retrieve a single user with id
  router.get("/:usuario", tereBD.findOne);

  // Update a Tutorial with id
  router.put("/:usuario", tereBD.update);

  // Delete a Tutorial with id
  router.delete("/:usuario", tereBD.delete);

  // Delete all Tutorials
  router.delete("/", tereBD.deleteAll);

  // ---------------------
  var router2 = require("express").Router();
  // Create a new Tutorial
  router2.post("/", tereBD2.create);

  // Retrieve all Tutorials
  router2.get("/", tereBD2.findAll);

  // Retrieve all USERS
  // router2.get("/ventas", tereBD2.findAllPublished);

  // Retrieve a single user with id
  router2.get("/:conceptoPago", tereBD2.findOne);

  // Update a Tutorial with id
  router2.put("/:conceptoPago", tereBD2.update);
 
  // Delete a Tutorial with id
  router2.delete("/:conceptoPago", tereBD2.delete);

  // Delete all Tutorials
  router2.delete("/", tereBD2.deleteAll);
  // -------------------------------
  var router3 = require("express").Router();
  router3.post("/", tereBD3.create);
  router3.get("/", tereBD3.findAll);
  router3.get("/:codigo", tereBD3.findOne);
  router3.put("/:codigo", tereBD3.update);
  router3.delete("/:codigo", tereBD3.delete);
  router3.delete("/", tereBD3.deleteAll);

  app.use('/api/productos', router3);
  app.use('/api/ventas', router2);
  app.use('/api/usuarios', router);
};
