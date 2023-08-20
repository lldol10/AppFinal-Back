const createUsers = `
CREATE TABLE IF NOT EXISTS
  "users" (
    id INTEGER PRIMARY KEY,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    isAdmin BOOLEAN,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`

module.exports = createUsers