require('dotenv').config()

const connect = require('./utils/db')
const Logger = require('./logger/logger')
const logger = Logger.getLogger('./populate.js')
const Product = require('./models/product')

const jsonProduct = require('./product.json')

const start = async ()=>{
    try {

        await connect(process.env.MONGO_URI)
        logger.info('Connect to mongo DB')
        // remove all the product
        await Product.deleteMany()

        // populate the jsonProduct
        await Product.create(jsonProduct)
        logger.info("Data populated")
        // 0 means everything well
        process.exit(0)
        
    } catch (error) {

        logger.error(error)
        process.exit(1)
        
    }
}

start()