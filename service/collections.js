const  CollectionDAO  = require('../dao/collections')

class CollectionSerivce {

    async readAll() {
        return CollectionDAO.readAll()
    }

    // async createCollection(DTO) {
    //     const { username, password, walletAddress } = DTO
    //     await collectionDao.createUser(username, password, walletAddress)
    // }
}

module.exports = new CollectionSerivce()