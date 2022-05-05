const express = require('express');
const router = express.Router();
const crypto = require('crypto');


const { Auction } = require('../models')



const {
    createAuctionsForm,
    bootstrapField
} = require('../forms')

const tableName = `auctions`

router.get('/', async (req, res) => {
    // #2 - fetch all the products (ie, SELECT * from products)
    let databaseData = await Auction.collection().fetch();
    console.log(databaseData.toJSON())
    res.render(`${tableName}`, {
        databaseData: databaseData.toJSON() // #3 - convert collection to JSON
    })
})

router.get('/:param_id/update', async (req, res) => {

    let databaseData = await Auction.where({
        id: req.params['param_id']
    }).fetch({ require: true })

    const databaseForm = createAuctionsForm()

    databaseForm.fields.nft_id.value = databaseData.get('nft_id')
    databaseForm.fields.auctionGroup_id.value = databaseData.get('auctionGroup_id')
    databaseForm.fields.user_id.value = databaseData.get('user_id')
    databaseForm.fields.minBidAmount.value = databaseData.get('minBidAmount')
    databaseForm.fields.bidInterval.value = databaseData.get('bidInterval')

    res.render('auctions/update', {
        form: databaseForm.toHTML(bootstrapField),
        databaseData: databaseData.toJSON()
    })
})



router.post('/:param_id/update', async (req, res) => {
    // fetch the product that we want to update
    let databaseData = await Auction.where({
        id: req.params['param_id']
    }).fetch({ require: true })

    // process the form
    const databaseForm = createAuctionsForm();

    databaseForm.handle(req, {
        'success': async (form) => {
            databaseData.set(form.data);
            databaseData.save();
            req.flash("success_messages", "Update was successful");
            res.redirect(`/${tableName}`);
        },
        'error': async (form) => {

            req.flash("error_messages", "Failed to update. Invalid data")
            res.redirect(`/${tableName}/${req.params['param_id']}/update`)
        }
    })
})

router.get('/:param_id/delete', async (req, res) => {
    // fetch the product that we want to delete
    const databaseData = await Auction.where({
        'id': req.params.param_id
    }).fetch({
        require: true
    });

    res.render('auctions/delete', {
        databaseData: databaseData.toJSON()
    })
});

router.post('/:param_id/delete', async (req, res) => {
    // fetch the product that we want to delete
    const databaseData = await Auction.where({
        'id': req.params.param_id
    }).fetch({
        require: true
    });
    try{
        await databaseData.destroy();
        req.flash('success-messages', `${tableName} - id : ${req.params.param_id} has been deleted`)
    } catch(e) {
        req.flash("error_messages", `${tableName} - Failed to delete id:${req.params.param_id}} `)
    }
    res.redirect(`/${tableName}`)
})

module.exports = router;

