const express = require('express');
const next = require('next');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const router = require('./routes/router');
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const schema = require('../db/models/graphqlSchema');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt',{session:false});
const requireSignin = passport.authenticate('local',{session:false});
const {cookieTokenValidation} = require('./services/utility')

// const app = express();
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const port = parseInt(process.env.PORT, 10) || 3090;
const handle = app.getRequestHandler();
// const server = http.createServer(app);

// const port = parseInt(process.env.PORT, 10) || 3000


//DB Setup

//for local without authentication
const uri = 'mongodb://localhost:27017/Agnito';

//for local with authentication
//const uri = 'mongodb://Agnito:Agnito123@localhost:27017/Agnito';

//for mlab with authentication
// const uri = 'mongodb://admin:'+encodeURIComponent("Agnito0@agnito")+'@ds239071.mlab.com:39071/agnito';

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };
mongoose.connect(uri,options)
        .then(() => {
                /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
                console.log("Connection to uri ",uri," was successfull")
            })
        .catch(err => { 
                /** handle initial connection error */ 
                console.log("Error connecting to ",uri,err)
            })



app.prepare().then(() => {
  const server = express();
  //middlewares
  server.use(cors({
    origin:"http://localhost:3000",
    credentials:true
  }));
  server.use(cookieParser());
  // server.use(cookieTokenValidation);
  server.use(passport.initialize());
  server.use('/graphql',expressGraphQL({
    schema,
    graphiql:true,
  }))
  server.use(bodyParser.json({type:'*/*'}));
  server.use(morgan('combined'));

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })
})
