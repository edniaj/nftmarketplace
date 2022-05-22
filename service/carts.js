const CartDAO = require('../dao/carts')

class CartService {

    async readCart(id) {
        return await CartDAO.readCart(id)
    }

    async deleteItem(buyer_id, nft_id) {
        return await CartDAO.deleteCart(buyer_id, nft_id)
    }


    async addItem(user_id, listing_id) {
        try {

            let validateCart = await CartDAO.validationCart(user_id, listing_id)                
            if(validateCart) {
                console.log(`cart does not have user_id : ${user_id} and listing_id: ${listing_id}`)
                return await CartDAO.addCart(user_id,listing_id)
            } else {
                throw new Error(`CartService.addItem user_id : ${user_id} and listing_id: ${listing_id} exist in database`)
            }

        } catch (e) {
            return false

        }
    }

}

module.exports = new CartService()