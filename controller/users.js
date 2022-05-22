const { User } = require('../models')
const UserService = require('../service/users')


class UserController {

    async readSales(req, res) {
        try {
            res.status(200)
            res.send(`OK`)
        } catch (error) {
            console.log(error)
            res.status(500)
            res.send(`not ok`)
        }
    }

    async createUser(req, res) {
        try {
            console.log(req.body)
            let { username, password } = req.body

            let data = await UserService.createUser(username, password)


            if (data == 'Error: User exist') throw new Error("User exist")


            res.status(200)
            res.send(`OK`)
        } catch (error) {
            res.status(500)
            res.send(error['response'][`statusText`])
        }
    }

    async getSales(req, res) {
        try {
            console.log(`getting sales for ${req.params['id']}`)
            let id = req.params['id']
            let data = await UserService.getSales(id)
            console.log(`sending data :${data}`)
            res.status(200)
            res.send(data)

        } catch (error) {
            res.status(500)
            res.end(`Internal server error`)
        }
    }

}

module.exports = new UserController()


// Controller handles http request. It will hold (req,res)  in the parameter. Controller doesn't access database
// Service layer will know the database logic and interact with the DAO. Service layer will have logic to interact with the data.
// DAO abstract database access. DAO create  an object inside the database. Dao will only have logic to CRUD. should be short 
