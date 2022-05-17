const { knex } = require('../bookshelf');
const { Collection } = require('../models')

class CollectionDAO {
    async readAll() {
        return Collection.collection().fetch({ require: true });
    }

    async readCollection(id, filterValue, limitAmount) {

        let { minimum, maximum, onlyListed } = filterValue
        // if empty then go to else
        if (Object.keys(filterValue).length) {
            // If there is no minimum / maximum value but user indicated they want to see onlyListed NFTS
            if (!minimum && !maximum && onlyListed) minimum = 1
            if (minimum || maximum) {
                minimum = minimum ? minimum : 0
                maximum = maximum ? maximum : 999999
                // console.log(`minimum :${minimum}`)
                // console.log(`maximum :${maximum}`)
                
                let data =  await knex('nfts_traits').select()
                    .innerJoin('traits', 'traits.id', `nfts_traits.trait_id`)
                    .innerJoin(`nfts`, `nfts.id`, `nfts_traits.nft_id`)
                    .innerJoin(`collections`, `nfts.collection_id`, `collections.id`)
                    .innerJoin(`listings`, `listings.nft_id`, `nfts.id`).where(`collections.id`, `=`, id)
                    .where('listings.price', '<', maximum)
                    .where('listings.price', '>', minimum)
                    .orderBy(`nfts.tokenId`)
                return data
            }   
            return await knex('nfts_traits').select().innerJoin('traits', 'traits.id', `nfts_traits.trait_id`).innerJoin(`nfts`, `nfts.id`, `nfts_traits.nft_id`).innerJoin(`collections`, `nfts.collection_id`, `collections.id`).where(`collections.id`, `=`, id).orderBy(`nfts.tokenId`)
        } else {
            return await knex('nfts').select().where(`collection_id`, `=`, id).orderBy('tokenId').limit(limitAmount)
        }
        // if they only want to show listed NFTs
        // sendData = knex('nfts_traits').select().innerJoin('traits', 'traits.id', `nfts_traits.trait_id`).innerJoin(`nfts`, `nfts.id`, `nfts_traits.nft_id`).innerJoin('listings',`listings.nft_id`,`nfts.id`).orderBy(`nfts.tokenId`)
    }

    async readTraitStats(id) {
        let data = await knex('nfts_traits').select().innerJoin(`traits`, `nfts_traits.trait_id`, `traits.id`).where(`traits.collection_id`, `=`, `${id}`)
        return data
    }

    async readListings(id) {
        let listingData = await knex(`listings`).select().innerJoin(`nfts`, `listings.nft_id`, `nfts.id`).where(`listings.status`, `=`, `active`).where(`nfts.collection_id`,`=`,id)
        // console.log('LISTING DATA)')
        // console.log(`listing data `, listingData)
        return listingData
    }
}

module.exports = new CollectionDAO()