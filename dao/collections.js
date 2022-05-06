const { Collection } = require('../models')

class CollectionDAO {
    async readAll() {
        return Collection.collection().fetch({require:true});
    }
}

module.exports = new CollectionDAO()