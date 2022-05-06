const CollectionSerivce = require('../service/collections')

class CollectionController {
    async readAll(req, res) {
        try{
            let fetchedData = await CollectionSerivce.readAll()
            console.log(fetchedData)
            res.status(200)
            res.send(fetchedData)
        } catch(e) {
            console.error(e)
            res.status(500)
            res.send('Internal server error')
        }
    }

}

module.exports = new CollectionController()


// Controller handles http request. It will hold (req,res)  in the parameter. Controller doesn't access database
// Service layer will know the database logic and interact with the DAO. Service layer will have logic to interact with the data.
// DAO abstract database access. DAO create  an object inside the database. Dao will only have logic to CRUD. should be short 
