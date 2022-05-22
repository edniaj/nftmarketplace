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
const insertCarts = async () => {

    const i = 0

    let arrayCarts = [
        {
            user_id: 1,
            listing_id: 1+i,
        },
        {
            user_id: 1,
            listing_id: 2+i,
        },
        {
            user_id: 1,
            listing_id: 3+i,
        },
        {
            user_id: 2,
            listing_id: 1+i,
        },
        {
            user_id: 2,
            listing_id: 2+i,
        },
        {
            user_id: 2,
            listing_id: 3+i,
        },
        
    ]

    for(let item of arrayCarts) {
        let respondData = await knex('carts').insert(item)
        console.log(respondData)
    }
    
}
insertCarts()
// let data = await knex(`carts`).select(`nfts.user_id as seller_id`, `carts.user_id as buyer_id`).innerJoin(`listings`, `listings.id`, `carts.listing_id`).innerJoin(`nfts`, `nfts.id`, `listings.nft_id`).where(`carts.user_id`, `=`, id)

// convertTraits()