const { checkIfAuthenticatedJWT } = require('../../middlewares');
const express = require('express');
const router = express.Router();
const CartService = require('../../service/carts');
const { createDepositsForm } = require('../../forms');
const bodyParser = require('body-parser');
const { knex } = require('../../bookshelf');


const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
console.log()

router.get('/', checkIfAuthenticatedJWT, async (req, res) => {


    // get all the items from the cart
    try {
        let items = await CartService.readCart(req.user['id']);
        // step 1 - create line items
        let lineItems = [];
        let meta = [];

        for (let item of items) {
            const lineItem = {
                'name': item[`nft_id`],
                'amount': item['price'],
                'quantity': 1,
                'currency': 'USD',
            }


            lineItems.push(lineItem);
            // save the quantity data along with the product id
            meta.push({
                'buyer_id': item['buyer_id'],
                'seller_id': item['seller_id'],
                'nft_id': item[`nft_id`],
                'listing_id': item[`listing_id`],
            })
        }

        // step 2 - create stripe payment
        let metaData = JSON.stringify(meta);

        const payment = {
            payment_method_types: ['card'],
            line_items: lineItems,
            success_url: process.env.STRIPE_SUCCESS_URL + '?sessionId={CHECKOUT_SESSION_ID}',
            cancel_url: process.env.STRIPE_ERROR_URL,
            metadata: {
                'orders': metaData
            }
        }

        // step 3: register the session
        let stripeSession = await Stripe.checkout.sessions.create(payment)

        res.status(200)
        res.send({
            'sessionId': stripeSession.id, // 4. Get the ID of the session
            'publishableKey': process.env.STRIPE_PUBLISHABLE_KEY
        })
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send(`Internal server error`)
    }

})

// Hook for stripes to send metadata so that we can modify the database
router.post('/process_payment', express.raw({
    type: "application/json",
}), async (req, res) => {
    try {
        console.log('PROCESSING PAYMENT')
        let payload = req.body;
        let endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
        let sigHeader = req.headers["stripe-signature"];
        let event;
        try {
            event = Stripe.webhooks.constructEvent(payload, sigHeader, endpointSecret);

        } catch (e) {
            res.send({
                'error': e.message
            })
            console.log(e.message)
        }
        if (event.type == 'checkout.session.completed') {
            let stripeSession = event.data.object;
            // process stripeSession
            let orders = JSON.parse(stripeSession['metadata']['orders'])
            for (let order of orders) {          
                console.log(`order is : ${JSON.stringify(order)}`)      
                let temp = await knex('sales').insert(order)
                await knex('listings').where(`id`, order['listing_id']).update({ active: "inactive" })
                let writeSql = knex('nfts').where(`id`, order[`nft_id`]).update({ user_id: order['buyer_id'] })
                console.log(writeSql.toSQL())
                await writeSql
                await knex(`carts`).where(`user_id`,order[`buyer_id`]).del()

            }
            
        }
        res.status(200)
        res.send({ received: true });
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send('Internal server error')
    }
})

module.exports = router;