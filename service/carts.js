const CartDAO = require('../dao/carts')

class CartService {

    async readCart(id) {
        return await CartDAO.readCart(id)
    }

}

module.exports = new CartService()