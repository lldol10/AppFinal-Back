const knex = require("../database/knex")

class TagsController {
    async index(request, response){
        

        const tags = await knex("tags").groupBy("name")


        return response.json(tags)
    }

}

module.exports = TagsController