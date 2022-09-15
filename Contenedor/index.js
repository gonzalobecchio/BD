import Contenedor  from './Contenedor.js'
import Config  from './Config.js'

const contenedor1 = new Contenedor(Config)

const product_1 = {
    title: 'Queso',
    price: 25,
    thumbnail: 'https://cdn1.iconfinder.com/data/icons/food-drink-21/64/Food-40-1024.png'
}

const product_2 = {
    title: 'Leche',
    price: 155,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/bakery-kitchen-3/512/milk-drink-bottle-1024.png'
}


/**SAVE PRODUCT */
// contenedor1.save(product_1)
// contenedor1.save(product_2)

/**GET BY ID */
// const product = await contenedor1.getById(54)
// console.log(product)

/**GET ALL */
// const products = await contenedor1.getAll()
// console.log(products)

/**DELETE BY ID */
//await contenedor1.deleteById(61)

/**DELETE ALL */
// await contenedor1.deleteAll()

