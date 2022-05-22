// Script to aggregate NFT into a txt file from IPFS

const axios = require('axios')
const fs = require('fs')







const main = async () => {
    newData = []
    maxSupply = 10000

    collectionName = 'DOODLE'
    interval = 70
    baseUri = `https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/`
    for (let k = 0; k < 1000;) {

        promiseList = []

        for (let i = interval * k; i < interval * k + interval; i++) {
            if (i >= maxSupply) break
            promiseList.push(axios.get(`${baseUri}${i}`).then(res => res.data))

        }
        await Promise.all(promiseList)
            .then(val => {
                newData = [...newData, ...val]
                console.log(newData.length)
                k++
            }).catch(err =>
                console.log(err, newData.length)
            )

    }

    fs.writeFileSync(`${collectionName}.txt`, JSON.stringify(newData))
}


// main()

dict = [
    // {
    //     collectionName: `CloneX`,
    //     baseUri: 'https://clonex-assets.rtfkt.com/',
    //     maxSupply: 19267,
    //     startIndex : 1
    // },
    // {
    //     collectionName: `Cool cat`,
    //     baseUri: 'https://api.coolcatsnft.com/cat/',
    //     maxSupply: 9941,
    //     startIndex: 0
    // },
    // {
    //     collectionName: `Oddstronauts`,
    //     baseUri: 'https://augminted.mypinata.cloud/ipfs/QmWYLTaZ4Fmor63EYkGzP6Xu3sJDgq65MFaqdYU8XwTBJG/',
    //     maxSupply: 10000,
    //     startIndex: 0
    // },
    // {
    //     collectionName: `World of women`,
    //     baseUri: 'https://wow-prod-nftribe.s3.eu-west-2.amazonaws.com/t/',
    //     maxSupply: 10000,
    //     startIndex: 0
    // },
    // {
    //     collectionName: `Impostor`,
    //     baseUri: 'https://impostors-meta.s3.amazonaws.com/',
    //     maxSupply: 10420,
    //     startIndex: 1
    // },
    // {
    //     collectionName: `Psychedelic Anonymous Genesis`,
    //     baseUri: 'https://ipfs.io/ipfs/QmdRAvWJa2Ck3pQPVni1DhYHc1zZNvJnZWAacS3vfWuDYA/',
    //     maxSupply: 9595,
    //     startIndex: 1
    // }, 
    // {
    //     collectionName: `Invisible friends`,
    //     baseUri: 'https://ipfs.io/ipfs/QmarGRwVKPaCe2s5QSSTMEdbYDwKxFz6bAn58YZPPcWc7k/',
    //     maxSupply: 5000,
    //     startIndex: 1
    // },
     {
        collectionName: `Kuma Verse`,
        baseUri: 'https://kumaverse.xyz/api/kuma/',
        maxSupply: 2000,
        startIndex: 1
    },


    
]


const addFile = async (obj) => {
    console.log('type of object is :', typeof (obj))
    const { baseUri, maxSupply, collectionName, startIndex } = obj
    newData = []

    interval = 70

    for (let k = 0; k < 1000;) {

        promiseList = []

        for (let i = interval * k + startIndex; i < interval * k + interval + startIndex; i++) {
            if (i >= maxSupply) break
            promiseList.push(axios.get(`${baseUri}${i}`).then(res => res.data))

        }
        await Promise.all(promiseList)
            .then(val => {
                newData = [...newData, ...val]
                console.log(newData.length)
                k++
            }).catch(err =>
                console.log(err, newData.length)
            )

    }

    fs.writeFileSync(`${collectionName}.txt`, JSON.stringify(newData))
}

dict.forEach(element => {
    addFile(element)
});

