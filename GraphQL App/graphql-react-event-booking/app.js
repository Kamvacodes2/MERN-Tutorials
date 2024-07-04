const express = require('express');
const bodyParse = require('body-parser');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');

const app = express();

const events = [];

app.use(bodyParser.json())

//Middleware for graphql
//query = fetching data
//! mutation = changing data e.g C,U,D of CRUD
app.use('/graphiql', graphQlHttp({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        
        input EventInput {
             title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }
        schema {
        query: RootQuery
        mutation: RootMutation
        }`),
    rootValue: {
        events: () => {
            return events;
        },
        createEvent: (x) => {
            const event = {
                _id: Math.random().toString(),
                title: x.title,
                description: x.description,
                price: +x.price,
                date: new Date().toISOString()
            }
            events.push(event);
        }
    },
    graphiql: true
}))
app.listen(3000, () => {
    console.log('currently listening on PORT 3000')
});