const CartService = require('../service/carts')

class CartController {


    async readCart(req,res) {
        try{
            let id = req.user.id
            console.log(`header info = `,req.user)
            let fetchedData = await CartService.readCart(id)
            res.status(200)
            res.send(fetchedData)
        } catch (e) {
            // console.error(e)
            res.status(500)
            res.send(`Internal Server error`)
        }
    }

    async deleteCart(req,res) {
        try{
            let nft_id = req.params[`id`]
            let buyer_id = req.user.id
            let resData = CartService.deleteItem(buyer_id, nft_id)
            res.status(200)
            res.send(resData)
        }
        catch(e) {
            console.log(e)
            res.status(500)
            res.send(`Internal server error`)
        }
    }

    async addCart(req,res) {
        console.log(`adding cart`)
        try{
            let user_id = req.user.id
            let {listing_id} = req.body
            let resData = await CartService.addItem(user_id, listing_id)
            console.log(resData)
            if (!resData) throw new Error("CartService has error")
            res.status(200)
            res.send(resData)
        } catch (e) {
            console.log(`error in CartController.addCart`)
            res.status(500)
            res.send('Internal server error')
        }
    }


}

module.exports = new CartController()

// Controller handles http request. It will hold (req,res)  in the parameter. Controller doesn't access database
// Service layer will know the database logic and interact with the DAO. Service layer will have logic to interact with the data.
// DAO abstract database access. DAO create  an object inside the database. Dao will only have logic to CRUD. should be short 
