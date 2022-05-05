class UserController{
    createUser(req,res){

    }
}

module.exports = new UserController()


// Controller handles http request. It will hold (req,res)  in the parameter. Controller doesn't access database
// Service layer will know the database logic and interact with the DAO
// DAO abstract database access. DAO create  an object inside the database.
