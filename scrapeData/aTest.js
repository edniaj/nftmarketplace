const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const knex = require('knex')({
    'client': process.env.DB_DRIVER,
    'connection': {
        'user': process.env.DB_USER,
        'password': process.env.DB_PASSWORD,
        'database': process.env.DB_DATABASE,
        'host': process.env.DB_HOST,
        'ssl': {
            'rejectUnauthorized': false
        }
    }
})

const main = async () => {
    data = await knex('nfts').select().orWhere({
        id: 2
    })
    console.log(data)
}

const test = () => {
    dict = {
        Mouth: ['Bored Cigarette', 'Phoneme L', 'Tongue Out'],
        Clothes: ['Bayc T Red', 'Tweed Suit', 'Wool Turtleneck'],
        Background: ['Army Green', 'Blue', 'Purple'],
        Eyes: ['3d', 'Bored', 'Closed'],
        Fur: ['Robot', 'Cheetah', 'Golden Brown', 'Red'],
        jackass: []
    }
    let lastKey = Object.keys(dict).slice(-1)
    let numberKeys = Object.keys(dict).length
    let newDict = {}

    for (let i of Object.keys(dict)) {
        if (dict[i].length == 0) delete dict[i]
    }
    let result = []
    let count = 0
    for (let i of Object.keys(dict)) {
        // dict[i] will be all the keys i.e. mouth, eyes, ...
        // 
        ++count
        if (count == 1) {
            newDict[1] = dict[i].map(item => { return { [i]: item } })
        } else {
            newDict[count] = []
            for (let j of newDict[count - 1]) {
                for (let k of dict[i]) {
                    newDict[count].push({ ...j, [i]: k })
                }
            }

        }
    }
    console.log(newDict[5].length)
    // fs.writeFileSync('./aTest.json', JSON.stringify(newDict))
}


const { Trait, Nft, Collection} = require('../models')

const writeFunction = async() => {
    const nft = new Nft()
    data = await nft.fetch({withRelated: 'traits'})
        

    console.log(data)
}
writeFunction()
// test()
// main()