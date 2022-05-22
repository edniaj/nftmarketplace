const { knex } = require('../bookshelf');


class ListingDAO {

    async validateUser(user_id, listing_id) {
        try {
            let data = await knex(`listings`)
                .innerJoin(`nfts`, `listings.nft_id`, `nfts.id`)
                .where(`nfts.user_id`, user_id)
                .where(`listings.id`, listing_id)
            if (data.length === 0) return false
            return true
        } catch (e) {
            console.log(`Error at validating listings`)
        }
    }

    async updateListing(price, listing_id) {
        try {
            let data = await knex(`listings`)
                .where(`id`, listing_id)
                .update({ price })
            console.log(`Added cart item`)
            console.log(data)
            return data
        } catch (e) {
            console.log(`Error at adding cart item ${e}`)
        }
    }

    async deleteListing(listing_id) {
        try {
            let data = await knex(`listings`)
                .where(`id`, listing_id)
                .del()
            console.log(`item has been deleted`)
            return data
        } catch (e) {
            console.log(`Error at adding cart item ${e}`)
        }
    }

    async createListing(price, nft_id) {
        try {
            let datetime = new Date().getTime()
            let newListing = {
                nft_id,
                datetime,
                price,
                active: 'active'
            }
            let data = await knex(`listings`).insert(newListing)
            return data
        } catch (error) {
            console.log(error)
            return error
        }

    }

}

module.exports = new ListingDAO()