const { knex } = require('../bookshelf');


class CartDao{    
    async readCart(id) {
        let data = await knex(`carts`).select().innerJoin(`listings`,`listings.id`,`carts.listing_id`).where(`carts.user_id`,`=`,id)        
        return data
    }

}

module.exports = new CartDao
()