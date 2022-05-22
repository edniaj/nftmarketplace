const e = require('connect-flash');
const { knex } = require('../bookshelf');


class CartDao {
    async readCart(id) {
        // let data = await knex(`carts`).select().innerJoin(`listings`,`listings.id`,`carts.listing_id`).innerJoin(`nfts`,`nfts.id`,`listings.nft_id`).where(`carts.user_id`,`=`,id)        
        let data = await knex('carts').select(`nfts.user_id as seller_id`, `carts.user_id as buyer_id`, `listings.price as price`, `*`).innerJoin(`listings`, `carts.listing_id`, `listings.id`).innerJoin(`nfts`, `nfts.id`, `listings.nft_id`).innerJoin(`collections`, `nfts.collection_id`, `collections.id`).where(`carts.user_id`, id).where('listings.active',`=`,`active`)
        return data
    }

    async deleteCart(buyer_id, nft_id) {
        let data = await knex('carts').innerJoin(`listings`, `carts.listing_id`, `listings.id`).innerJoin(`nfts`, `nfts.id`, `listings.nft_id`).where(`nfts.id`, nft_id).where(`carts.user_id`, buyer_id).del()
        return data
    }

    async validationCart(user_id, listing_id) {
        try {
            let data = await knex(`carts`)
            .innerJoin('listings', `listings.id`, `carts.listing_id`)
            .where(`listings.id`, listing_id)
            .where(`user_id`, user_id)
            if(data.length > 0 ) {
                return false
            } else {
                return true
            }
        } catch (e) {
            console.log(e)
        }
        
    }

    async addCart(user_id, listing_id) {
        try{
            let data = await knex(`carts`).insert({user_id, listing_id})
            console.log(`Added cart item`)
            return data
        } catch (e) {
            console.log(`Error at adding cart item ${e}`)
        }
    }

}

module.exports = new CartDao
    ()