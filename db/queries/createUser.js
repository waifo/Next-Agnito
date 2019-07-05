const models = require('../models/models');
const Users = models.UsersModelClass;

module.exports = (userProps) =>{
    const user = new Users(userProps);
    return user.save();
}