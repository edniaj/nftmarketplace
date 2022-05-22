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


// This function is meant to clean up data because I can't use ORM hasmany function.
const testFunction = async (filterValue) => {
    const filterMethod = (data, filterValue) => {
        const filterKeys = Object.keys(filterValue)
        AllTokens = Object.keys(data)
        let returnData = []
        AllTokens.forEach(token => {
            let addToken = true

            filterKeys.forEach(key => {
                if (data[token]['traits'].hasOwnProperty(key)) {
                    // if traits[key] is not inside filterValue[key] (an array) then you shouldn't add
                    if (!(filterValue[key].includes(data[token][`traits`][key]))) addToken = false
                } else {
                    // doesn't have traits
                    addToken = false
                }
            })

            if (addToken) returnData.push(token)

        })
        return returnData
    }

    let sendData = await knex('nfts_traits').select().innerJoin('traits', 'traits.id', `nfts_traits.trait_id`).innerJoin(`nfts`, `nfts.id`, `nfts_traits.nft_id`).orderBy(`nfts.tokenId`)
    let dict = {}
    sendData.forEach(item => {
        let { tokenId, status, traitType, traitValue, imageUrl } = item
        dict[tokenId]
            ? dict[tokenId] = dict[tokenId]['traits'] = { ...dict[tokenId], 'traits': { ...dict[tokenId]['traits'], [traitType]: traitValue } }
            : dict[tokenId] = { 'traits': { [traitType]: traitValue }, status, imageUrl }

    })
    Object.keys(filterValue).forEach(key => {
        console.log(filterValue[key].length)
        if (filterValue[key].length == 0) delete filterValue[key]
    })
    console.log(filterValue)
    finalValue = filterMethod(dict, filterValue)
    console.log(finalValue)

}
const filterValue = {
    Background: ['Purple', 'Yellow', 'Blue'],
    Clothes: ['Striped Tee'],
    Earring: ['Diamond Stud'],
    test: []
}



// async function checkCart(id) {
//     let data = await knex('carts').select(`nfts.user_id as seller_id`, `carts.user_id as buyer_id`, `listings.price as price`,`listing_id`,'*').innerJoin(`listings`,`carts.listing_id`,`listings.id`).innerJoin(`nfts`,`nfts.id`,`listings.nft_id`).where(`carts.user_id`,id)
// }

async function check() {
    let order = { "buyer_id": 2, "seller_id": 1, "nft_id": 12, "listing_id": 30 }
    // let data = await knex(`carts`)
    // .innerJoin('listings', `listings.id`, `carts.listing_id`)
    // .where(`listings.id`, listing_id)
    // .where(`user_id`, user_id)
    // let data = await knex(`listings`)
    // .innerJoin(`nfts`, `listings.nft_id`, `nfts.id`)
    // .where(`nfts.user_id`, user_id)
    // .where(`listings.id`, listing_id)
    let user = 2
    // let writeSql = knex('sales')
    // .innerJoin(`listings`,`sales.listing_id`,`listings.id`)
    // .innerJoin(`nfts`,`nfts.id`,`listings.nft_id`)
    // .where(`buyer_id`, user)
    // .orWhere(`seller_id`, user)
    // await writeSql.then(res => console.log(res))
    let datetime = 1653096083954
    let date = new Date(datetime)
    console.log("Date: " + date.getDate() +
        "/" + (date.getMonth() + 1) +
        "/" + date.getFullYear() +
        " " + date.getHours() +
        ":" + date.getMinutes() +
        ":" + date.getSeconds());
}
check()
// checkCart(2)
// main()