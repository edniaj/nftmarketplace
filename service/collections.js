const CollectionDAO = require('../dao/collections')

class CollectionService {

    async readAll() {
        return CollectionDAO.readAll()
    }

    async readCollection(id, page) {
        return CollectionDAO.readCollection(id, page)
    }

    async readTraitStats(id) {
        let data = await CollectionDAO.readTraitStats(id)
        let dict = {}
        for (let i of data) {
            let { traitType, traitValue } = i
            if (traitType in dict) {
                if (traitValue in dict[traitType]) {
                    dict[traitType][traitValue]++
                } else {
                    dict[traitType][traitValue] = 1
                }
            } else {
                dict[traitType] = { [traitValue]: 1 }
            }
        }

        return dict
    }

}

module.exports = new CollectionService()