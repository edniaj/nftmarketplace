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





const addTraits = async (traitsDict, collectionId) => {

    let writeData = []

    // Clean up data
    for (i in traitsDict) {
        traitsDict[i] = Array.from(traitsDict[i])
    }

    for (traitType in traitsDict) {
        traitsDict[traitType].forEach(traitValue => {
            writeData.push({
                collection_id: collectionId,
                traitType,
                traitValue
            })
        })
    }
    await knex('traits').insert(writeData)
    console.log(`Done adding traits`)
}

const setPivotTable = async (collectionId, txtData) => {
    traitDict = {}
    nftDict = {}
    writePivot = []

    await knex('traits').select().where('collection_id', '=', collectionId).then((res) => {
        res.forEach(v => {
            key = v['traitType'] + v['traitValue']
            traitDict[key] = v['id']
        })
    })

    await knex('nfts').select().where('collection_id', '=', collectionId).then((res) => {
        res.forEach(v => {
            key = v['imageUrl']
            nftDict[key] = v['id']
        })
    })

    txtData.map(async (item) => {

        if (item['image'].substring(0, 4) == `ipfs`) {
            item['image'] = `https://ipfs.io/ipfs/` + item['image'].substring(7,)
        }

        listTraitHash = []
        item['attributes'].forEach(attribute => {
            listTraitHash.push(attribute['trait_type'] + attribute['value'])
        })

        nft_id = nftDict[item['image']]


        listTraitHash.forEach(async (hash) => {
            let writeData = {
                trait_id: traitDict[hash],
                nft_id
            }
            writePivot.push(writeData)
        })
    })

    for (let i = 0; i < writePivot.length; i += 30000) {
        writeData = writePivot.slice(i, i + 30000)
        await knex('nfts_traits').insert(writeData).then(x => console.log(x)).catch(err => console.error(err))
        console.log(`Writing pivot table on iteration ${i}`)
    }

    console.log(`Done writing pivot table for collection ID : ${collectionId}`)

}



const convertTraits = async (x, collectionId) => {
    let rawData = await fs.readFileSync(x,
        { encoding: 'utf8', flag: 'r' });

    data = JSON.parse(rawData)
    jsonCopy = JSON.parse(rawData)
    let writeNfts = []
    let traitsDict = {}

    data.map(async (item, index) => {

        if (item['image'].substring(0, 4) == `ipfs`) {
            item['image'] = `https://ipfs.io/ipfs/` + item['image'].substring(7,)
        }

        // clean up data
        item['attributes'] = item['attributes'].map(async (x) => {
            if (traitsDict[x.trait_type] == undefined) traitsDict[x.trait_type] = new Set()
            traitsDict[x.trait_type].add(x.value)
        })

        writeNfts.push(
            {
                tokenId: index,  // assuming index starts with 0
                collection_id: collectionId,
                user_id: 1,
                status: 'notListed',
                imageUrl: item['image']
            }
        )

    })
    await addTraits(traitsDict, collectionId)
    await knex('nfts').insert(writeNfts).then(x => console.log(x))
    await setPivotTable(collectionId, jsonCopy)
    return 
    // addTraits(traitsDict, collectionId)


}

const main = async () => {
    const readFiles = ['./moonbird.txt', './bayc.txt', './azuki.txt']
    collectionId = [2,3,4] // change this value
    await convertTraits(readFiles[0], collectionId[0])
    await convertTraits(readFiles[1], collectionId[1])
    await convertTraits(readFiles[2], collectionId[2])
    // readFiles.forEach( async(x,i) => {
    //     await convertTraits(x, collectionId[i])
    // })
}


main()
