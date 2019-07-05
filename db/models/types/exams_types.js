const graphql = require('graphql');
const {GraphQLObjectType,GraphQLString,GraphQLList} = graphql;

const ExamsTypes = new GraphQLObjectType({
    name:'ExamsTypes',
    fields:{
       examName:{type:GraphQLString},
       mockTests:{type:GraphQLString},
    }
}); 

module.exports = ExamsTypes;