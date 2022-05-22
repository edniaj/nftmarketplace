const ListingDAO = require('../dao/listings')

class ListingService {

    async updateListing(price, user_id, listing_id) {
        try {
            console.log(price, user_id, listing_id)
            let valid = await ListingDAO.validateUser(user_id, listing_id)
            if (valid) {
                console.log("Listing is valid")
                let data = await ListingDAO.updateListing(price, listing_id)
                return data
            }            
        } catch (e) {
            console.log(e)
            return e
        }
    }

    async deleteListing(user_id, listing_id) {

        try {
            let valid = await ListingDAO.validateUser(user_id, listing_id)
            if (valid) {
                console.log("Listing is valid")
                console.log(listing_id)
                let data = await ListingDAO.deleteListing(listing_id)
                return data
            }   
        } catch (e) {
            console.log(e)
            return e
        }
    }

    async createListing(price, nft_id){
        try {

            //validation
            if (isNaN(price)) return new Error("Price has to be an integer")
            return await ListingDAO.createListing(price, nft_id)

        } catch (error) {            
            return error
        }
    }

}

module.exports = new ListingService()