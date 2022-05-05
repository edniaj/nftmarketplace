const express = require('express');
const router = express.Router();
const crypto = require('crypto');


const { AuctionGroup } = require('../models')



const {
    createAuctionGroupsForm,
    bootstrapField
} = require('../forms')

const tableName = `auctionGroups`

router.get('/', async (req, res) => {
    // #2 - fetch all the products (ie, SELECT * from products)
    let databaseData = await AuctionGroup.collection().fetch();
    res.render(`${tableName}`, {
        databaseData: databaseData.toJSON() // #3 - convert collection to JSON
    })
})

router.get('/:param_id/update', async (req, res) => {

    let databaseData = await AuctionGroup.where({
        id: req.params['param_id']
    }).fetch({ require: true })

    const databaseForm = createAuctionGroupsForm()

    databaseForm.fields.name.value = databaseData.get('name')
    databaseForm.fields.startDateTime.value = databaseData.get('startDateTime')
    databaseForm.fields.endDateTime.value = databaseData.get('endDateTime')
    databaseForm.fields.auctionGroupsApproved.value = databaseData.get('auctionGroupsApproved')

    res.render('auctionGroups/update', {
        form: databaseForm.toHTML(bootstrapField),
        databaseData: databaseData.toJSON()
    })
})



router.post('/:param_id/update', async (req, res) => {
    // fetch the product that we want to update
    let databaseData = await AuctionGroup.where({
        id: req.params['param_id']
    }).fetch({ require: true })

    // process the form
    const databaseForm = createAuctionGroupsForm();

    databaseForm.handle(req, {
        'success': async (form) => {
            databaseData.set(form.data);
            databaseData.save();
            req.flash("success_messages", "Update was successful");
            res.redirect(`/${tableName}`);
        },
        'error': async (form) => {
            console.log('error')
            req.flash("error_messages", "Failed to update. Invalid data")
            res.redirect(`/${tableName}/${req.params['param_id']}/update`)
        }
    })
})

router.get('/:param_id/delete', async (req, res) => {
    // fetch the product that we want to delete
    const databaseData = await AuctionGroup.where({
        'id': req.params.param_id
    }).fetch({
        require: true
    });

    res.render('auctionGroups/delete', {
        databaseData: databaseData.toJSON()
    })
});

router.post('/:param_id/delete', async (req, res) => {
    // fetch the product that we want to delete
    const databaseData = await AuctionGroup.where({
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

