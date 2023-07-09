
exports.up = knex => knex.schema.createTable("pratos", table => {
    table.increments("id")
    table.varchar("imagem")
    table.text("name")
    table.text("category")
    table.text("description")
    table.integer("price")
    table.integer("user_id").references("id").inTable("users")
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())

}) 
  


exports.down = knex => knex.schema.dropTable("pratos")
