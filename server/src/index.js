import { PORT } from "./config";
import app from "./app";
import loggerFactory from "./utils/loggerFactory"
// import db from "../models";

const logger = loggerFactory("App")(console.log)

// db.sequelize.sync({ force: true }).then(() => {
app.listen(PORT, () => {
  logger(`running on port ${PORT}`)
});
// });
