const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer,gql } = require('apollo-server-express');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolver');
const Version = require("./datasources/version");

// #5 Initialize an Apollo server
const apolloServer = new ApolloServer({ 
  typeDefs, 
  resolvers,
  dataSources:()=>({
    version: new Version(),
  })
});

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const port = parseInt(process.env.PORT, 10) || 3090;
const handle = nextApp.getRequestHandler();
// const server = http.createServer(app);


nextApp.prepare().then(() => {
  
  const app = express();
  apolloServer.applyMiddleware({ app });
  // middlewares
  app.use(cors());
  app.use(bodyParser.urlencoded({extended:true}));

  app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })

  app.get('*', (req, res) => {
    return handle(req, res)
  })
})
