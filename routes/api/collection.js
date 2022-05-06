const express = require('express');
const router = express.Router();
const  CollectionController  = require('../../controller/collections.js')
router.get('/', CollectionController.readAll )

module.exports = router     