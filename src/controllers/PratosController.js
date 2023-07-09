const knex = require("../database/knex")

class PratosController{
    async create(request, response){
        const {name, category, description, tags, price} = request.body
        const {user_id} = request.params

             const [prato_id] = await knex("pratos").insert({
                 name,
                 category,
                 description,
                 price,
                 user_id
             })

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
        // const {user_id} = request.query
        

        // let notes

        // if(tags){
            
        //     const filterTags = tags.split(',').map(tag => tag.trim())
        //     console.log(filterTags)
        //     notes = await knex("tags")
        //     .select([
        //         "notes.id",
        //         "notes.title",
        //         "notes.user_id"
        //     ])
        //     .where("notes.user_id", user_id)
        //     .whereLike("notes.title", `%${title}%`)
        //     .whereIn("name", filterTags)
        //     .innerJoin("notes", "notes.id", "tags.note_id")
        //     .groupBy("notes.id")
        //     .orderBy("notes.title")
        //     console.log(notes)
        // }else{
        //     notes =  await knex("notes").where({user_id}).whereLike("title", `%${title}%`).orderBy("title")

        // }

        // const userTags = await knex("tags").where({user_id})
        // console.log(userTags + "aqui luan")
        // console.log(notes + "aqui é o note")
        // const notesWithTags = notes.map(note => {
        //     const noteTags = userTags.filter(tag => tag.note_id === note.id)

        //     return{
        //         ...note,
        //         tags: noteTags

        //     }
        // })

        // return response.json(notesWithTags)

        const {user_id, name, tags} = request.query

         let pratos

        if(tags){
            const filterTags = tags.split(',').map(tag => tag.trim())
            
            pratos = await knex("tags")
            .select([
                "pratos.id",
                "pratos.name",
                "pratos.user_id"
            ])
            
            .where("pratos.user_id", user_id)
            .whereLike("pratos.name",  `%${name}%`)
            .whereIn("tags.name", filterTags)
            .innerJoin("pratos", "pratos.id", "tags.prato_id")
            .orderBy("pratos.name")
        }else{
             pratos = await knex("pratos").where({user_id}).whereLike("name", `%${name}%`).orderBy("name")
             
        }

        const userTags = await knex("tags").where({user_id})

        const pratosWithTags = pratos.map(prato =>{
            const pratoTags = userTags.filter(tag => tag.prato_id === prato.id)

         return{
             ...prato,
             tags: pratoTags
         }
        })
        console.log(pratosWithTags)
        return response.json(pratosWithTags)
    }

}

module.exports = PratosController