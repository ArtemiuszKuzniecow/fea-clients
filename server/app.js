const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const routes = require("./routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);

const PORT = config.get("port");

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.green("MongoDB connected"));
    app.listen(PORT, () => {
      console.log(chalk.greenBright(`Server has been started on port ${PORT}`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();
