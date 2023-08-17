const {Router} = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const PratosController = require("../controllers/PratosController")
const PratoImgController = require("../controllers/PratoImgController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const pratosRoutes = new Router()
const upload = multer(uploadConfig.MULTER)

const pratosController = new PratosController()
const pratoImgController = new PratoImgController()

 pratosRoutes.use(ensureAuthenticated)

pratosRoutes.get("/",pratosController.index)
pratosRoutes.post("/",  pratosController.create)
pratosRoutes.get("/:id",pratosController.show)
pratosRoutes.delete("/:id",pratosController.delete)
pratosRoutes.put("/:id",ensureAuthenticated, pratosController.update)
pratosRoutes.patch("/avatar/:id",upload.single("avatar"),pratoImgController.update)

module.exports = pratosRoutes