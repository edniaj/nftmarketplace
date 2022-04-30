const bookshelf = require("../bookshelf");

const Admin = bookshelf.model('Admin', {
    tableName: 'admins',  
})

const User = bookshelf.model('User', {
    tableName: 'users',  
})

const Collection = bookshelf.model('Collection', {
    tableName: 'collections',  
})

module.exports = {
    Admin,
    User,
    Collection
}