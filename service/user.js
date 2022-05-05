const userDao = require('../dao/user')

class UserSerivce {
    async createUser(userDTO) {
        const {username, password, walletAddress} = userDTO
            await userDao.createUser(username,password, walletAddress)
    }
}