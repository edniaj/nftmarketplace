const { knex } = require('../bookshelf');
const { Collection } = require('../models')

class CollectionDAO {
    async readAll() {
        return Collection.collection().fetch({ require: true });
    }

    async readCollection(id, page) {
        let limit = 10
        let offset = parseInt(page) * limit
        let sendData = knex('nfts').select().innerJoin('collections', 'collections.id', 'nfts.collection_id').where(`collection_id`, `=`, id).limit(limit).offset(offset).orderBy('tokenId')
        await sendData
        return sendData
    }

    async readTraitStats(id) {
        
        let data = await knex('nfts_traits').select().innerJoin(`traits`, `nfts_traits.trait_id`, `traits.id`).where(`traits.collection_id`, `=`, `${id}`)
        return data
    }
}

module.exports = new CollectionDAO()