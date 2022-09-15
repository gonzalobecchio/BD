import knex from 'knex'

const Contenedor = class {
	constructor(config, table = 'products') {
		this.table = 'products'
		this.mysql = knex({
			client: 'mysql',
			connection: config,
			useNullAsDefault: true
		})

		this.mysql.schema.hasTable(this.table).then((exist) => {
			if (!exist) {
				return mysql.schema.createTable(this.table, (table) => {
					table.increments('id').primary()
					table.string('title', 60).notNullable()
					table.integer('price').notNullable()
					table.string('thumbnail', 255).notNullable()
				})
			}
		})
	}

	async save(product) {
		await this.mysql
			.insert(product)
			.into(this.table)
	}

	async getById(id) {
		const result = await this.mysql(this.table).where('id', id)
		return JSON.parse(JSON.stringify(result))
	}

	async getAll() {
		const result = await this.mysql.select()
			.from(this.table)
		return JSON.parse(JSON.stringify(result))
	}

	/*Devuelve los registros afectados*/ 
	async deleteById(id) {
		const row_delete = await this.mysql(this.table)
			.where('id', id)
			.del()
		return await JSON.parse(JSON.stringify(row_delete))	
	}

	/**Elimina todos los registros */
	async deleteAll() {
		await this.mysql(this.table).del()	
	}

}


export default Contenedor  