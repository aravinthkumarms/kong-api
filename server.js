const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/index");
const { connectToDb } = require("./config/db/config");
const app = express(); // create an instance of express

// middleware
// Enable preflight requests for all routes
app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json()); // support json encoded bodies

// app.use(express.urlencoded({ extended: true })); // support encoded bodies

const PORT = process.env.PORT || 8001;

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  }
});

app.use("/api", cors(), router); // use the router
