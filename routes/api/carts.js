
const express = require('express');
const router = express.Router();
const CartController = require('../../controller/carts.js');
const { checkIfAuthenticatedJWT } = require('../../middlewares/index.js');


router.get('/', checkIfAuthenticatedJWT, CartController.readCart)

router.delete('/delete/:id', checkIfAuthenticatedJWT, CartController.deleteCart)

router.post('/add', checkIfAuthenticatedJWT, CartController.addCart)

module.exports = router     