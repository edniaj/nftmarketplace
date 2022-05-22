const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const knex = require('knex')({
    'client': process.env.DB_DRIVER,
    'connection': {
        'user': process.env.DB_USER,
        'password': process.env.DB_PASSWORD,
        'database': process.env.DB_DATABASE,
        'host': process.env.DB_HOST,
        'ssl': {
            'rejectUnauthorized': false
        }
    }
})






// main(3)
const insertListings = async () => {

    let arrayListings = [
        {
            nft_id: 10003,
            datetime: 1652839838,
            price: 42000,
            active: 'active'
        },
        {
            nft_id: 10009,
            datetime: 1652839438,
            price: 32500,
            active: 'active'
        },
        {
            nft_id: 10012,
            datetime: 1652839839,
            price: 14250,
            active: 'active'
        },
    ]

    for(let item of arrayListings) {

        let respondData = await knex('listings').insert(item)
        console.log(respondData)

    }
    
}
insertListings()
// let data = await knex(`carts`).select(`nfts.user_id as seller_id`, `carts.user_id as buyer_id`).innerJoin(`listings`, `listings.id`, `carts.listing_id`).innerJoin(`nfts`, `nfts.id`, `listings.nft_id`).where(`carts.user_id`, `=`, id)

// convertTraits()