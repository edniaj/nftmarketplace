const ListingService = require('../service/listings')

class ListingController {

    async updateListing(req, res) {
        try {
            let listing_id = req.params['id']
            let { price } = req.body
            let user_id = req.user.id

            let data = await ListingService.updateListing(price, user_id, listing_id)
            if (!data) throw new Error("Error updating data")
            res.status(200)
            res.send("OK")
            // res.send(resData)
        } catch (e) {
            console.log(e)
            res.status(500)
            res.send('Internal server error')
        }
    }

    async deleteListing(req, res) {
        console.log("deleting ")
        try {
            let listing_id = req.params['id']
            let user_id = req.user.id
            let data = await ListingService.deleteListing(user_id, listing_id)
            if (!data) throw new Error("Error updating data")
            console.log("OK")
            res.status(200)
            res.send("OK")
        } catch (e) {
            console.log(`error : `,e)
            res.status(500)
            res.send('Internal server error')
        }
    }

    async createListing(req,res){
        try{
            let {price, nft_id} = req.body
            let data = await ListingService.createListing(price,nft_id)
            console.log(data)
            res.status(200)
            res.send(`OK`)
        } catch (e) {
            res.status(500)
            res.send('Internal server error')
        }
    }

}

module.exports = new ListingController()

// Controller handles http request. It will hold (req,res)  in the parameter. Controller doesn't access database
// Service layer will know the database logic and interact with the DAO. Service layer will have logic to interact with the data.
// DAO abstract database access. DAO create  an object inside the database. Dao will only have logic to CRUD. should be short 
