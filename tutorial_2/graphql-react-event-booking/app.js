const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const Event = require("./models/event.js");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    type Event {
    _id: ID!
    title: String
    description: String!
    price: Float!
    date: String!
    }

    type User {
    _idL ID!
    email: String!
    password: String
    }

    input UserInput {
    email:String
    password!
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
    //resume code from here
    createUser
    }

    schema {
    query: RootQuery
    mutation: RootMutation
    }
    `),
    rootValue: {
      events: () => {
        return Event.find()
        .then((events) => {
          return events.map(event => {
            return { ...event._doc, _id: event.id };
          })
        })
        .catch((error) => {
          throw error
        })
      },
      createEvent: (args) => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
        });
        return event
          .save()
          .then(result => {
            console.log(result);
            return { ...result._doc, _id: result._doc._id.toString() };
          })
          .catch((error) => {
            console.log(error);
            throw error;
          });
      },
    },
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.spdfyze.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("App is listening on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
