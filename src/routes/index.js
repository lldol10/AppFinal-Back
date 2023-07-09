const {Router} = require("express")

const usersRouter = require("./users.routes")
const pratosRouter = require("./pratos.routes")
const tagsRouter = require("./tags.routes")
const sessionRouter = require("./session.routes")

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/sessions", sessionRouter)
routes.use("/prato", pratosRouter)
routes.use("/tags", tagsRouter)

module.exports = routes