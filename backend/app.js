const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const acTerritoryRoutes = require("./routes/acTerritories");


app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));


app.use("/api/v1/", acTerritoryRoutes);


app.listen(5002, () =>
  console.log("Backend listening on port 5002!")
);
