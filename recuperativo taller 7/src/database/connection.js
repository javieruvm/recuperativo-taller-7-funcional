const mongoose = require("mongoose");
require("dotenv").config();
class Connect {
  async connectDB() {
    try {
      await mongoose.connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log("Base de datos conectada!");
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new Connect();
