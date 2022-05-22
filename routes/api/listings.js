
const express = require('express');
const router = express.Router();
const ListingController = require('../../controller/listings.js')
const { checkIfAuthenticatedJWT } = require('../../middlewares/index.js');


router.put('/update/:id', checkIfAuthenticatedJWT, ListingController.updateListing)
router.delete('/delete/:id', checkIfAuthenticatedJWT, ListingController.deleteListing)
router.post('/create', checkIfAuthenticatedJWT, ListingController.createListing)
module.exports = router