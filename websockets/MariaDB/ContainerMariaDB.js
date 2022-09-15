const { configMariaDB } = require('../MariaDB/ConfigMariaDB')
const knex = require('knex')(configMariaDB)

class ContainerMariaDB {
    constructor(table = 'product_chat'){
        this.mysql = knex
        this.table = table

        this.mysql.schema.hasTable(this.table).then((exist) => {
            if (!exist) {
                return this.mysql.schema.createTable(this.table, (table) => {
                    table.increments('id').primary(),
                    table.string('title', 60),
                    table.string('price', 10),
                    table.string('file')
                })
            }
        })
    }

    async save(product){
        await this.mysql(this.table).insert(product)
    }

    async allProducts(){
        return await this.mysql()
                         .select()
                         .table(this.table)
    }
}

module.exports = { ContainerMariaDB }