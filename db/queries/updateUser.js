const models = require('../models/models');
const Users = models.UsersModelClass;

/**
 * Edits a single user in the Users collection
 * @param {string} _id - The ID of the user to edit.
 * @param {object} userProps - An object with properties of user to update
 * @return {promise} A promise that resolves when the user record is edited
 */
module.exports = (_id,userProps) =>{
    return Users.update({_id},userProps);
}