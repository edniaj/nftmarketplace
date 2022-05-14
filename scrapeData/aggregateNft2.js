// Script to aggregate NFT into a txt file from IPFS

const axios = require('axios')
const fs = require('fs')





const main = async () => {
    newData = []
    maxSupply = 19949

    collectionName = 'beanz'
    interval = 70
    baseUri = `https://ikzttp.mypinata.cloud/ipfs/QmPZKyuRw4nQTD6S6R5HaNAXwoQVMj8YydDmad3rC985WZ/`
    for (let k = 0; k < 1000;) {

        promiseList = []

        for (let i = 1 + interval * k; i <= interval * k + interval; i++) {
            if (i > maxSupply) break
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


main()