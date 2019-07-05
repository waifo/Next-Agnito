const models = require('../models/models');
const Users = models.UsersModelClass;
const findByEmail = (email)=>{
    return Users.findOne({email:email})
}
const findAll = ()=>{
    return Users.find({})
}

const findById = (_id)=>{
    return Users.findById(_id)
}

module.exports = {
    findByEmail,
    findAll,
    findById
}