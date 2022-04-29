const bookshelf = require("../bookshelf");

const Admin = bookshelf.model('Admin', {
    tableName: 'admins',  
})

const User = bookshelf.model('User', {
    tableName: 'users',  

})

module.exports = {
    Admin
}