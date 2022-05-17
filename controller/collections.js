const CollectionService = require('../service/collections')

class CollectionController {
    async readAll(req, res) {
        try{
            let fetchedData = await CollectionService.readAll()
            // console.log(fetchedData)
            res.status(200)
            res.send(fetchedData)
        } catch(e) {
            console.error(e)
            res.status(500)
            res.send('Internal server error')
        }
    }

    async readCollection(req,res) {
        try{
            let id = req.query['id']
            let page = req.query['page']
            let filterValue = req.query['filter'] ? JSON.parse(req.query['filter']) : ''
            let fetchedData = await CollectionService.readCollection(id,page, filterValue)
            res.status(200)
            res.send(fetchedData)
        } catch (e) {
            console.error(e)
            res.status(500)
            res.send(`Internal Server error`)
        }
    }

    async readTraitStats(req,res) {
        try{
            console.log(`whats up`)
            let id = req.query['id']
            let fetchedData = await CollectionService.readTraitStats(id)
            res.status(200)
            res.send(fetchedData)
        } catch (e) {
            console.error(e)
            res.status(500)
            res.send(`Internal Server error`)
        }
    }

}

module.exports = new CollectionController()

// Controller handles http request. It will hold (req,res)  in the parameter. Controller doesn't access database
// Service layer will know the database logic and interact with the DAO. Service layer will have logic to interact with the data.
// DAO abstract database access. DAO create  an object inside the database. Dao will only have logic to CRUD. should be short 
