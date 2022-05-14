const express = require('express');
const { knex } = require('../../bookshelf');
const router = express.Router();


router.get('/readall', async (req,res) => {
    
    data = await knex('nfts').select()
    res.send(data)
})




module.exports = router     