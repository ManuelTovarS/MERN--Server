//Ruta para crear una tarea
const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/tareaController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");
const Tarea = require("../models/Tarea");

//Crear una tarea
// /api/tarea
router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("proyecto", "El proyecto es obligatorio").not().isEmpty(),
  ],
  tareaController.crearTarea
);

//Obtiene las tareas por proyecto
router.get(
    "/",
    auth,
    tareaController.obtenerTareas
);

//Actualizar una tarea
router.put(
    '/:id',
    auth,
    tareaController.actualizarTarea
)

//Eliminar una tarea
router.delete(
    '/:id',
    auth,
    tareaController.eliminarTarea
)

module.exports = router;
