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

// let data = fs.readFileSync('./azuki.txt',
//               {encoding:'utf8', flag:'r'});

// data = JSON.parse(data)


const convertTraits = async () => {
    let rawData = await fs.readFileSync('./bayc.txt',
        { encoding: 'utf8', flag: 'r' });

    data = JSON.parse(rawData)
    data = data.map(x => x['attributes'])
    data2 = []
    for (let i of data) {
        for (let j of i) {
            data2.push(j)
        }
    }
    data = data2
    dict = {}
    for (let i of data) {

        let { trait_type, value } = i
        traitType = trait_type
        traitValue = value
        if (traitType in dict) {
            if (traitValue in dict[traitType]) {
                dict[traitType][traitValue]++
            } else {
                dict[traitType][traitValue] = 1
            }
        } else {
            dict[traitType] = { [traitValue]: 1 }
        }
    }

    console.log(dict)



}

const main = async () => {
    // Simple query using where - like - 
    // data = await knex('collections').select().where('name', 'like', '%o%').limit(1)

    // Operator AND
    // data = await knex('collections').select().where({
    //     id: 1,
    //     name: `Moonbird`
    // }).limit(1) 

    //OPERATOR comparison
    // data = await knex('collections').select().where('id', '>=', 1)

    // Multiple Where Conjunction (2 where )
    // data = await knex('collections').select().where('id', '>=', 1).where('id', '<=', 2)

    // Multiple Where  Conjuection ( OR  ) 
    // sort using orderBy
    // data = await knex('collections').select().where('id', '>=', 1).orWhere('id', '<=', -8).orderBy('name')

    // Aggregation with GROUP BY
    // data = await knex('collections').select('name').count('name').groupBy('name').limit(5)


    // Table Joins ( thriple inner join)
    // data = await knex('auctions').select().innerJoin('nftID', 'auctions.nft_id','nfts.id').innerJoin('auction_group_name','auctions.auctionGroup_id','auctionGroups.id').orderBy('auction_group_name')
    // data = await knex('auctions').select().innerJoin('nfts', 'auctions.nft_id','nfts.id').innerJoin('auctionGroups','auctions.auctionGroup_id','auctionGroups.id')
    // let command = data.toString()
    // pagination
    // data = knex('nfts').select().limit(50).offset(2)
    // data = knex('nfts').select().innerJoin('collections','collections.id','nfts.collection_id').where(`collection_id`, `=` , 2).limit(10).offset(3).orderBy('tokenId')


    // We will create cache table to insert value 
    let id = 2
    data = await knex('nfts_traits').select().innerJoin(`traits`, `nfts_traits.trait_id`, `traits.id`).where(`traits.collection_id`, `=`, `${id}`)


    dict = {}

    for (let i of data) {
        let { traitType, traitValue } = i
        if (traitType in dict) {
            if (traitValue in dict[traitType]) {
                dict[traitType][traitValue]++
            } else {
                dict[traitType][traitValue] = 1
            }
        } else {
            dict[traitType] = { [traitValue]: 1 }
        }
    }
    // we will prep data inside a list and insertMany into db
    let writeDict = []

    Object.keys(dict).forEach(trait => {
        Object.keys(dict[trait]).forEach(value => {
            writeDict.push(
                {
                    collection_id: id,
                    traitType: trait,
                    traitValue: value,
                    frequency: dict[trait][value]
                }
            )
            console.log(`type: ${trait} value: ${value} : ${dict[trait][value]} collection_id:${id}`)
        })
    })

    await knex(`traitCaches`).insert(writeDict).then(x => console.log(x)).catch(err => console.error(err))
    // console.log(dict)


}


main()
// convertTraits()