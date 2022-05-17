const CollectionDAO = require('../dao/collections')

class CollectionService {

    async readAll() {
        return CollectionDAO.readAll()
    }

    async readCollection(id, page, filterValue) {

        const filterMethod = (data, filterValue) => {
            const filterKeys = Object.keys(filterValue)
            let AllTokens = Object.keys(data)
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



        let limit = 10
        let limitAmount = page * 10 + limit
        let nftData, listingData
        // get data from DAO

        // Get data from listings and NFT
        await Promise.allSettled([CollectionDAO.readCollection(id, filterValue, limitAmount), CollectionDAO.readListings(id)]).then(res => {
            console.log(res)
            nftData = res[0]['value'] ? res[0]['value'] : []
            listingData = res[1]['value'] ? res[1]['value'] : []
        }).catch(err => console.log(err))

        let dict = {}

        // assign 1 to many relationship token into object dict
        nftData.forEach(item => {
            let { tokenId, status, traitType, traitValue, imageUrl } = item
            dict[tokenId]
                ? dict[tokenId] = dict[tokenId]['traits'] = { ...dict[tokenId], 'traits': { ...dict[tokenId]['traits'], [traitType]: traitValue } }
                : dict[tokenId] = { 'traits': { [traitType]: traitValue }, status, imageUrl }

        })

        // Remove any empty array from filterValue
        Object.keys(filterValue).forEach(key => {
            if (filterValue[key].length == 0) delete filterValue[key]
        })
        // Remove minimum and maximuim
        if (filterValue[`minimum`]) delete filterValue[`minimum`]
        if (filterValue[`maximum`]) delete filterValue['maximum']
        if (filterValue.hasOwnProperty('onlyListed')) delete filterValue[`onlyListed`]
        // filtered value
        let filteredTokenId = filterMethod(dict, filterValue).slice(0, limitAmount)
        // console.log('filtered token Id : ', filteredTokenId)
        let returnList = filteredTokenId.map(id => {
            return { ...dict[id], tokenId: id }
        })

        listingData.forEach(listing => {
            // console.log(listing)
            let tokenId = listing['tokenId']

            returnList.forEach((item, index) => {

                if (item.hasOwnProperty(`tokenId`) && item['tokenId'] == tokenId) {

                    returnList[index]['datetime'] = listing['datetime']
                    returnList[index]['price'] = listing['price']
                }
            })

        })
        console.log(returnList)
        return returnList
    }

    async readTraitStats(id) {
        let data = await CollectionDAO.readTraitStats(id)
        let dict = {}
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

        return dict
    }

}

module.exports = new CollectionService()