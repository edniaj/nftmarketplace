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
                // this is because price is denominated in cents, we minus 1 because knex query builder doesn't allow gte
                minimum *= 100
                maximum *= 100
                // console.log(`minimum :${minimum}`)
                // console.log(`maximum :${maximum}`)

                let data = await knex('nfts_traits').select()
                    .innerJoin('traits', 'traits.id', `nfts_traits.trait_id`)
                    .innerJoin(`nfts`, `nfts.id`, `nfts_traits.nft_id`)
                    .innerJoin(`collections`, `nfts.collection_id`, `collections.id`)
                    .innerJoin(`listings`, `listings.nft_id`, `nfts.id`).where(`collections.id`, `=`, id)
                    .where('listings.price', '<', maximum)
                    .where('listings.price', '>', minimum)
                    .where(`listings.active`, `active`)
                    .orWhere(`listings.price`, minimum)
                    .orWhere(`listings.price`, maximum)
                    .orderBy(`nfts.tokenId`)
                return data
            }
            return await knex('nfts_traits').select().innerJoin('traits', 'traits.id', `nfts_traits.trait_id`).innerJoin(`nfts`, `nfts.id`, `nfts_traits.nft_id`).innerJoin(`collections`, `nfts.collection_id`, `collections.id`).where(`collections.id`, `=`, id).orderBy(`nfts.tokenId`)
        } else {
            return await knex('nfts').select(`nfts.id as nft_id`, `*`)
                .innerJoin(`collections`, `nfts.collection_id`, `collections.id`)
                .where(`collection_id`, `=`, id).orderBy('tokenId').limit(limitAmount)
        }
        // if they only want to show listed NFTs
        // sendData = knex('nfts_traits').select().innerJoin('traits', 'traits.id', `nfts_traits.trait_id`).innerJoin(`nfts`, `nfts.id`, `nfts_traits.nft_id`).innerJoin('listings',`listings.nft_id`,`nfts.id`).orderBy(`nfts.tokenId`)
    }
    async readCollectionWithoutJoin(id) {
        let data = await knex('collections').select().where(`id`,id)
        console.log(data)
        return data
    }
    async readTraitStats(id) {
        let data = await knex('nfts_traits').select().innerJoin(`traits`, `nfts_traits.trait_id`, `traits.id`).where(`traits.collection_id`, `=`, `${id}`)
        return data
    }

    async readListings(id) {
        let listingData = await knex(`listings`).select(`listings.id as listing_id`, `*`)
            .innerJoin(`nfts`, `listings.nft_id`, `nfts.id`)
            .where(`listings.active`, `=`, `active`).where(`nfts.collection_id`, `=`, id)
        return listingData
    }

    async readUserListing(user_id) {
        try {
            let data = await knex('listings').select(`nfts.id as nft_id`, `listings.id as listing_id`, `*`)
                .innerJoin(`nfts`, `listings.nft_id`, `nfts.id`)
                .innerJoin(`collections`, `nfts.collection_id`, `collections.id`)
                .where(`listings.active`, `=`, `active`)
                .where(`nfts.user_id`, `=`, user_id)
                .orderBy(`tokenId`)
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async readUserAll(id, limitAmount) {
        let responseData = await knex('nfts')
            .select(`nfts.id as nft__id`, `listings.id as listing__id`, `*`)
            .innerJoin(`collections`, `nfts.collection_id`, `collections.id`)
            .innerJoin(`users`, `nfts.user_id`, `users.id`)
            .leftOuterJoin(`listings`, `nfts.id`, `listings.nft_id`)
            .where(`users.id`, `=`, id)
            .orderBy('nfts.id').limit(limitAmount)
        return responseData
    }

}





module.exports = new CollectionDAO()