const bookshelf = require("../bookshelf");

const Admin = bookshelf.model('Admin', {
    tableName: 'admins',
})

const User = bookshelf.model('User', {
    tableName: 'users',
    nft() {
        return this.hasMany('Nft')
    },
    deposit() {
        return this.hasMany('Deposit')
    },
    launchpad() {
        return this.hasMany('Launchpad')
    },
    listing() {
        return this.hasMany('listing')
    },
    Bidding() {
        return this.hasMany('Bidding')
    }
})

const Collection = bookshelf.model('Collection', {
    tableName: 'collections',
    trait() {
        return this.hasMany('Trait')
    }
})

const Trait = bookshelf.model('Trait', {
    tableName: 'traits',
    collection() {
        return this.belongsTo('Collection')
    },
    nft() {
        return this.belongsToMany('Nft')
    }
})

const Nft = bookshelf.model('Nft', {
    tablename: 'nfts',
    collection() {
        return this.belongsTo('Collection')
    },
    user() {
        return this.belongsTo('User')
    },
    trait() {
        return this.belongsToMany('Trait')
    },
    deposit() {
        return this.hasMany("Deposit")
    },
    launchpad() {
        return this.hasMany('Launchpad')
    },
    listing() {
        return this.hasMany('listing')
    }

})

const Deposit = bookshelf.model('Deposit', {
    tableName: 'deposits',
    user() {
        return this.belongsTo('User')
    },
    nft() {
        return this.belongsTo('Nft')
    }

})

const Launchpad = bookshelf.model('Launchpad', {
    tableName: 'launchpads',
    nft() {
        return this.belongsTo('Nft')
    },
    user() {
        return this.belongsTo('User')
    }
})


const Listing = bookshelf.model('Listing', {
    tableName: 'listings',
    nft() {
        return this.belongsTo('Nft')
    },
    user() {
        return this.belongsTo('User')
    }
})

const AuctionGroup = bookshelf.model('AuctionGroup', {
    tableName: "auctionGroups",
    auction() {
        return this.hasOne('auction')
    }
})

const Auction = bookshelf.model('Auction', {
    tableName: 'auctions',
    auctionGroup() {
        return this.belongsTo("AuctionGroup")
    }
})

const Bid = bookshelf.model('Bid', {
    tableName: 'Bids',
    nft() {
        return this.belongsTo('Nft')
    },
    user() {
        return this.belongsTo('User')
    }
})

const Sale = bookshelf.model('Sale', {
    tableName: 'sales',
    buyer() {
        return this.belongsTo('User')
    },
    seller() {
        return this.belongsTo('User')
    },
    nft() {
        return this.belongsTo('Nft')
    },
})

const BlacklistedToken = bookshelf.model('BlacklistedToken',{
    tableName: 'blacklisted_tokens'
})


module.exports = {
    Admin,
    User,
    Collection,
    Nft,
    Auction,
    Bid,
    Sale,
    AuctionGroup,
    Listing,
    Launchpad,
    Trait,
    Deposit,
    BlacklistedToken
}