const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")



class PratoImgController{
    async update(request, response){
        const prato_id = request.body
        const {id} = request.params
        const avatarFileName = request.file.filename

        console.log('request' + request)

        const diskStorage = new DiskStorage()

        const prato = await knex("pratos").where({id}).first()
        
        if(!prato){
            throw new AppError("Somente usuarios altenticados podem mudar o avatar", 401)
        }

        if(prato.imagem){
            await diskStorage.deleteFile(prato.imagem)
        }

        const filename = await diskStorage.saveFile(avatarFileName)
        prato.imagem = filename

        await knex("pratos").update(prato).where({id})
        return response.json(prato)

    }
}

module.exports = PratoImgController