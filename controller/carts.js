const CartService = require('../service/carts')

class CartController {



    async readCart(req,res) {
        try{
            let id = req.query['id']        
            let fetchedData = await CartService.readCart(id)
            res.status(200)
            // res.send(fetchedData)
        } catch (e) {
            console.error(e)
            res.status(500)
            res.send(`Internal Server error`)
        }
    }



}

module.exports = new CartController()

// Controller handles http request. It will hold (req,res)  in the parameter. Controller doesn't access database
// Service layer will know the database logic and interact with the DAO. Service layer will have logic to interact with the data.
// DAO abstract database access. DAO create  an object inside the database. Dao will only have logic to CRUD. should be short 
