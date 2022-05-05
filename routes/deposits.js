const express = require('express');
const router = express.Router();
const crypto = require('crypto');


const { Deposit } = require('../models')



const {
    createDepositsForm,
    bootstrapField
} = require('../forms')

router.get('/', async (req, res) => {
    // #2 - fetch all the products (ie, SELECT * from products)
    let deposits = await Deposit.collection().fetch();
    res.render('deposits', {
        'deposits': deposits.toJSON() // #3 - convert collection to JSON
    })
})

router.get('/:deposit_id/update', async (req, res) => {

    let deposit = await Deposit.where({
        id: req.params['deposit_id']
    }).fetch({ require: true })

    const depositForm = createDepositsForm()
    depositForm.fields.txHash.value = deposit.get('txHash')
    depositForm.fields.nft_id.value = deposit.get('nft_id')
    depositForm.fields.user_id.value = deposit.get('user_id')
    depositForm.fields.datetime.value = deposit.get('datetime')
    depositForm.fields.depositApproved.value = deposit.get('depositApproved')

    res.render('deposits/update', {
        form: depositForm.toHTML(bootstrapField),
        deposit: deposit.toJSON()
    })
})

router.post('/:deposit_id/update', async (req, res) => {
    // fetch the product that we want to update
    let deposit = await Deposit.where({
        id: req.params['deposit_id']
    }).fetch({ require: true })

    // process the form
    const depositForm = createDepositsForm();

    depositForm.handle(req, {
        'success': async (form) => {
            deposit.set(form.data);
            deposit.save();
            req.flash("success_messages", "Update was successful");
            res.redirect('/deposits');
        },
        'error': async (form) => {
            req.flash("error_messages", "Failed to update. Invalid data")
            res.redirect(`/deposits/${req.params['deposit_id']}/update`)
        }
    })
})

router.get('/:deposit_id/delete', async (req, res) => {
    // fetch the product that we want to delete
    const deposit = await Deposit.where({
        'id': req.params.deposit_id
    }).fetch({
        require: true
    });

    res.render('deposits/delete', {
        'deposit': deposit.toJSON()
    })
});

router.post('/:deposit_id/delete', async (req, res) => {
    // fetch the product that we want to delete
    const deposit = await Deposit.where({
        'id': req.params.deposit_id
    }).fetch({
        require: true
    });
    console.log("deleting")
    console.log(deposit.get('id'))
    await deposit.destroy();
    res.redirect('/deposits')
})

module.exports = router;


