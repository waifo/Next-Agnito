const {gql} = require("apollo-server");
const typeDefs = gql`
    type Query{
       version:Version
    }

    type Version{
        version:String
    }
`;

module.exports = typeDefs;



