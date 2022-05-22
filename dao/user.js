const { knex } = require("../bookshelf");

class UserDAO {

    async validateUser(username) {
        try {
            console.log(`validating user`)
            let data = await knex(`users`).where(`username`, username)
            if (data.length > 0) return false
            return true
        } catch (error) {
            console.log(error)
        }

    }

    async createUser(username, password) {

        let data = await knex('users').insert({ username, password })
        return data

    }
    async getSales(id) {
        console.log(`reading sales thru knex`)
        let data = await knex('sales').innerJoin(`listings`, `sales.listing_id`, `listings.id`)
            .innerJoin(`nfts`, `nfts.id`, `listings.nft_id`)
            .where(`buyer_id`, id)
            .orWhere(`seller_id`, id)
            .orderBy('datetime', 'desc')
        console.log(`data is ${data}`)
        return data
    }
}

module.exports = new UserDAO()