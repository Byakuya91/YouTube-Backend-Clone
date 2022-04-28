const mongoose = require("mongoose");
const connectDb = () => {
  mongoose
    //   CONNECTION_STRING equals link from Mongodb
    .connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDb..."))
    .catch((err) => {
      console.log(`Could not connect to MongoDb. Error: ${err}`);
      process.exit(1);
    });
};

module.exports = connectDb;
