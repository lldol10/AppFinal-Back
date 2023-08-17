const knex = require("../database/knex")
const sqliteConnection = require("../database/sqlite")
const PratoImgController = require("./PratoImgController")

class PratosController{
    async create(request, response){
        const {name, category, description, avatar, tags, price} = request.body
        const user_id = request.user.id

             const [prato_id] = await knex("pratos").insert({
                 name,
                 category,
                 description,
                 price,
                 user_id
             })

             PratoImgController.update

        const tagsInsert = tags.map(name => {
            return {
                prato_id,
                name,
                user_id
            }
            
        })


        await knex("tags").insert(tagsInsert)

        return response.json()

    }

    async show(request, response){
        const { id } = request.params
        console.log(id)
        const prato = await knex("pratos").where({id}).first()
        const tags = await knex("tags").where({prato_id: id}).orderBy("name")
        // const links = await knex("links").where({note_id: id}).orderBy("created_at")

        return response.json({
            ...prato,
            tags
        })
    }

    async delete(request, response){
        const {id} = request.params

        await knex("pratos").where({id}).delete()

        return response.json()
    }

    async index(request, response){

        // const {name, tags} = request.query
        // const user_id = request.user.id
        
        //  let pratos

        // if(tags){
        //     const filterTags = tags.split(',')
        //     console.log(filterTags)
        //     pratos = await knex("tags")
        //     .select([
        //         "pratos.id",
        //         "pratos.name",
        //         "pratos.user_id"
        //     ])
            
        //     .where("pratos.user_id", user_id)
        //     .whereLike("pratos.name",  `%${name}%`)
        //     .whereIn("tags.name", filterTags)
        //     .innerJoin("pratos", "pratos.id", "tags.prato_id")
        //     .orderBy("pratos.name")

        
        // }else{
        //      pratos = await knex("pratos").where({user_id}).whereLike("name", `%${name}%`).orderBy("name")
             
             
        // }

        // const userTags = await knex("tags").where({user_id})
 
        // const pratosWithTags = pratos.map(prato =>{
        //     const pratoTags = userTags.filter(tag => tag.prato_id === prato.id)

        //  return{
        //      ...prato,
        //      tags: pratoTags
        //  }
        // })
        // console.log(pratosWithTags)
        // return response.json(pratosWithTags)
        const pratos = await knex("pratos")
        return response.json(pratos)
    }

    async update(request, response){
        const {name, category, description, tags, price} = request.body
        const {id} = request.params
        const user_id = request.user.id

        PratoImgController.update()

        
        const database = await sqliteConnection()
    
        const prato = await database.get("SELECT * FROM pratos WHERE id = (?)", [id])

        console.log('nome que eu coloquei: ' + name)
        console.log('nome que está no banco: ' + prato.name)
   
        //prato.name = name ?? prato.
        name ? prato.name = name : prato.name = prato.name
        category ? prato.category = category : prato.category = prato.category
        description ? prato.description = description : prato.description = prato.description
        price ? prato.price = price : prato.price = prato.price
        
    

        console.log('nome que ficou no final: ' + prato.name)


        await database.run(`
        UPDATE pratos SET
        name = ?,
        category = ?,
        description = ?,
        price = ?,
        updated_at = DATETIME('now')
        WHERE id = ?`,
        [prato.name, prato.category, prato.description, prato.price, id]
        )


        const tagsinsert = tags.map(tag => {
            return{
                name,
                prato_id: id,
                user_id
            }
        })

        
        await knex("tags").where({id}).delete()
        await knex("tags").insert(tagsinsert)
        

        return response.status(200).json()
        
    }

}

module.exports = PratosController