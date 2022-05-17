const express = require('express');
const router = express.Router();
const CartController = require('../../controller/carts.js')


router.get('/search', CartController.readCart)

module.exports = router     