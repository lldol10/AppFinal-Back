
exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id")
    table.text("name").notNullable()
    table.integer("prato_id").references("id").inTable("pratos").onDelete("CASCADE")
    table.integer("user_id").references("id").inTable("users")
}) 
  


exports.down = knex => knex.schema.dropTable("tags")
