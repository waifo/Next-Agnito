const graphql = require('graphql');
const {GraphQLSchema} = graphql;
const RootQueryType = require('./types/root_query_type');
// const UsersType = require('./types/users_types');
const mutation = require('../mutations/mutations')

module.exports = new GraphQLSchema({
    query:RootQueryType,
    mutation
})