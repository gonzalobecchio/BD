const { ConfigSQLite3 } = require('./ConfigSQLite')
const knex = require('knex')(ConfigSQLite3)

class ContainerSQLite {
    constructor(table = 'messages'){
        this.sqlite3 = knex
        this.table = table

        this.sqlite3.schema.hasTable(this.table).then((exist) => {
            if (!exist) {
                this.sqlite3.schema.createTable(this.table, (table) => {
                    table.increments('id')
                    table.string('email', 100)
                    table.text('mensaje'),
                    table.timestamp('created_at').defaultTo(knex.fn.now())
                })
                .then(x => console.log(x))
                .catch(err => console.log(err))
            }
        })
    }

    async save(message){
        await this.sqlite3(this.table).insert(message)
    }

    async allMessages(){
        return await this.sqlite3()
                             .select()
                             .table(this.table)
    }

}

module.exports = { ContainerSQLite }