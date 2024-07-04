const express = require('express');
const bodyParse = require('body-parser');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');

const app = express();


app.use(bodyParser.json())

//Middleware for graphql
//query = fetching data
//! mutation = changing data e.g C,U,D of CRUD
app.use('/graphiql', graphQlHttp({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]
        }

        type RootMutation {
            createEvent(name: String): String
        }
        schema {
        query: RootQuery
        mutation: RootMutation
        }`),
    rootValue: {
        events: () => {
            return  ['Sailing', 'Coding', 'Cooking', 'Crafting']
        },
        createEvent: (x) => {
            const eventName = x.name
            return eventName;
        }
    },
    graphiql: true
}))
app.listen(3000, ()=>{
    console.log('currently listening on PORT 3000')
});