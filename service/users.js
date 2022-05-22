const UserDAO = require('../dao/user')
const crypto = require('crypto');
class UserService {
    async createUser(username, password) {

        const getHashedPassword = (password) => {
            const sha256 = crypto.createHash('sha256');
            const hash = sha256.update(password).digest('base64');
            return hash;
        }

        try {
            console.log(`creating user`)

            let isValid = await UserDAO.validateUser(username)
            if (!isValid) throw new Error("User exist")

            let data = await UserDAO.createUser(username, getHashedPassword(password))
            return data
        } catch (error) {

            return error
        }
    }
    async getSales(id) {
        try {
            
            let data = await UserDAO.getSales(id)
            console.log(data)
            return data

        } catch (error) {
            res.status(500)
            res.send(`Internal server error`)
        }
    }
}

module.exports = new UserService()
