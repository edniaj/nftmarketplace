const express = require('express');

const router = express.Router();
const CollectionController = require('../../controller/collections.js')


router.get('/', CollectionController.readAll)

router.get('/search', CollectionController.readCollection)

router.get(`/traitStats`, CollectionController.readTraitStats)

router.get('/listings/search', CollectionController.readUserListings)

router.get('/user/search', CollectionController.readUserAll)

router.get(`/withoutJoin`, CollectionController.readCollectionWithoutJoin)



module.exports = router     