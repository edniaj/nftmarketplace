const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const app = express()

const { Collection } = require('../models')
const CollectionDAO = require('../dao/collections')


const {
    createCollectionsForm,
    bootstrapField,
    createAssetsForm
} = require('../forms');
const { knex } = require('../bookshelf');

router.get('/:page', async (req, res) => {
    // #2 - fetch all the products (ie, SELECT * from products)
    let limit = 100
    let page = req.params['page']
    let nextPage = parseInt(page) + 1
    let previousPage = parseInt(page) - 1
    let collections = await knex('nfts').select().limit(100).offset(100 * page)
    res.render('assets', {
        'collections': collections,
        previousPage,
        nextPage
    })
})

router.post('/search', async (req, res) => {
    // #2 - fetch all the products (ie, SELECT * from products)
    let { id } = req.body
    console.log(req.body)
    let collections = await knex('nfts').select().where(`id`, id)
    res.render('assets', {
        'collections': collections,
    })
})


router.get('/:id/update', async (req, res) => {

    let id = req.params['id']
    let [collection] = await knex('nfts').select().where(`id`, id)
    const assetForm = createAssetsForm()
    assetForm.fields['id']['value'] = collection['id']
    assetForm.fields.tokenId.value = collection['tokenId']
    assetForm.fields.collection_id.value = collection['collection_id']
    assetForm.fields.user_id.value = collection['user_id']
    assetForm.fields['imageUrl'].value = collection['imageUrl']

    //
    res.render('collections/update', {
        form: assetForm.toHTML(bootstrapField),
        collection: collection
    })
})

router.post('/:id/update', async (req, res) => {
    // fetch the product that we want to update
    let id = req.params['id']

    // process the form
    const assetForm = createAssetsForm();

    assetForm.handle(req, {
        'success': async (form) => {
            let updateData = form['data']
            console.log('success')
            let data = await knex('nfts').where(`id`, id).update(updateData)
            console.log(`sql data : `, data)
            req.flash("success_messages", "Update was successful");
            res.redirect('./');
        },
        'error': async (form) => {
            console.log(`Failure`)
            console.log(form)
            req.flash("error_messages", "Failed to update. Invalid data")
            res.redirect(`/assets/${id}/update`)
        }
    })
})

//
router.get('/:collection_id/delete', async (req, res) => {
    // fetch the product that we want to delete
    let id = req.params['collection_id']
    let collection = await knex(`nfts`).select().where(`id`, id)
    collection = collection[0]
    console.log(collection)
    res.render('assets/delete', {
        collection
    })
});

router.post('/:collection_id/delete', async (req, res) => {
    // fetch the product that we want to delete
    let id = req.params['collection_id']
    let data = await knex(`nfts`).select().where(`id`,id).del()
    console.log(data)
    req.flash("success_messages", "Delete was successful");
    res.redirect('/assets/0')
})



module.exports = router;


