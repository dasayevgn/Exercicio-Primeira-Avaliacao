const express = require("express");
const alunoController = require("../controllers/AlunoController");
const validarAluno = require("../middlewares/validarAluno");
const validarAlunoId = require("../middlewares/validarAlunoId");
const validarAlunoUpdate = require("../middlewares/validarAlunoUpdate");

const router = express.Router();

router.get("/", (request, response, next) => {
    console.log("Executando antes do findMany");
    next();
}, alunoController.findMany);

router.get("/:id", validarAlunoId, alunoController.findById);
router.post("/", validarAluno, alunoController.create);
router.put("/:id", validarAlunoId, validarAlunoUpdate, alunoController.update);
router.patch("/:id", validarAlunoId, validarAlunoUpdate, alunoController.update);
router.delete("/:id", validarAlunoId, alunoController.delete);

module.exports = router;
