import express from "express";
import bodyParser from "body-parser"
import loggerFactory from "../utils/loggerFactory"
import graphqlHTTP from "express-graphql"
import { buildSchema } from "graphql"
import userSchema from "../schema"
import root from "../resolvers"
import db from "../../models"
import userRepository from "../repository/user"
import cors from "cors";


const logger = loggerFactory("App")(console.log)

//test
const schema = buildSchema(userSchema);

class App  {
  constructor() {
    logger("App initializing...")
    this.express = express()
    this.express.use(bodyParser.urlencoded({ extended: false }))
    this.express.use(bodyParser.json())
    this.express.use(cors())

    this.express.use('/graphql', graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
      context: {
        repository: userRepository
      }
    }));

    this.init()
  }

  async init() {
    await this._connectDB();
  }

  async _connectDB() {
    try {
      //{ force: true }
      await db.sequelize.sync()
    } catch (error) {
      throw new Error("ERROR trying to connect to DB");
    }
  }
}

export default new App().express