const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const app = express()

const { Collection } = require('../models')



const {
    createCollectionsForm,
    bootstrapField
} = require('../forms')

router.get('/', async (req, res) => {
    // #2 - fetch all the products (ie, SELECT * from products)
    let collections = await Collection.collection().fetch();
    res.render('collections', {
        'collections': collections.toJSON() // #3 - convert collection to JSON
    })
})

router.get('/:collection_id/update', async (req, res) => {

    let collection = await Collection.where({
        id: req.params['collection_id']
    }).fetch({ require: true })
    const collectionForm = createCollectionsForm()
    collectionForm.fields.name.value = collection.get('name')
    collectionForm.fields.address.value = collection.get('address')
    collectionForm.fields.supply.value = collection.get('supply')
    collectionForm.fields.baseTokenUri.value = collection.get('baseTokenUri')
    collectionForm.fields.profileUrl.value = collection.get('profileUrl')
    collectionForm.fields.bannerUrl.value = collection.get('bannerUrl')
    collectionForm.fields.collectionApproved.value = collection.get('collectionApproved')
    //
    res.render('collections/update', {
        form: collectionForm.toHTML(bootstrapField),
        collection: collection.toJSON()
    })
})

router.post('/:collection_id/update', async (req, res) => {
    // fetch the product that we want to update
    console.log('asdfasdf')
    let collection = await Collection.where({
        id: req.params['collection_id']
    }).fetch({ require: true })

    // process the form
    const collectionForm = createCollectionsForm();

    collectionForm.handle(req, {
        'success': async (form) => {
            collection.set(form.data);
            collection.save();
            req.flash("success_messages", "Update was successful");
            res.redirect('/collections');
        },
        'error': async (form) => {
            req.flash("error_messages", "Failed to update. Invalid data")
            res.redirect(`/collections/${req.params['collection_id']}/update`)
        }
    })
})

//
router.get('/:collection_id/delete', async (req, res) => {
    // fetch the product that we want to delete
    const collection = await Collection.where({
        'id': req.params.collection_id
    }).fetch({
        require: true
    });

    res.render('collections/delete', {
        'collection': collection.toJSON()
    })
});

router.post('/:collection_id/delete', async (req, res) => {
    // fetch the product that we want to delete
    console.log('aaa')
    const collection = await Collection.where({
        'id': req.params.collection_id
    }).fetch({
        require: true
    });
    console.log("deleting")
    console.log(collection.get('id'))
    await collection.destroy();
    res.redirect('/collections')
})



module.exports = router;


