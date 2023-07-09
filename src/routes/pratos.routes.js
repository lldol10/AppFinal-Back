const {Router} = require("express")

const PratosController = require("../controllers/PratosController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const pratosRoutes = new Router()


const pratosController = new PratosController()

// pratosController.use(ensureAuthenticated)

pratosRoutes.get("/",pratosController.index)
pratosRoutes.post("/:user_id",pratosController.create)
pratosRoutes.get("/:id",pratosController.show)
pratosRoutes.delete("/:id",pratosController.delete)

module.exports = pratosRoutes