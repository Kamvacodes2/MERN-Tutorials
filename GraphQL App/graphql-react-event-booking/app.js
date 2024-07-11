const express = require('express');
const bodyParse = require('body-parser');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql').graphqlHTTP;
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolver = require('./graphql/resolvers/index')
const isAuth = require('./middleware/is-auth')
const mongoose = require('mongoose')


const app = express();

app.use(bodyParser.json())

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
})

app.use(isAuth)


// mongodb url mongodb+srv://roo1:12345@cluster0.rcwipbt.mongodb.net/

//Middleware for graphql
//query = fetching data
//! mutation = changing data e.g C,U,D of CRUD
app.use('/graphiql', graphQlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
}))


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.rcwipbt.mongodb.net/${process.env.MONGO_DB}`)
    .then().catch(err => {
        console.log(err);
    })
app.listen(8000, () => {
    console.log('currently listening on PORT 8000')
});