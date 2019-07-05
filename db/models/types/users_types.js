const graphql = require('graphql');
const {GraphQLObjectType,GraphQLString,GraphQLID,GraphQLBoolean} = graphql;

const UsersType = new GraphQLObjectType({
    name:'UsersType',
    fields:{
        _id:{type:GraphQLID},
        email:{type:GraphQLString},
        token:{type:GraphQLString},
        isOnline:{type:GraphQLBoolean}
    }
});

module.exports = UsersType;