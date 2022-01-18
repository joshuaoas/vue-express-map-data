const express = require("express");

//const validateUser = require("../middleware/validateUser.js");

const acTerritoryController = require("../controllers/acTerritoryController");

const router = express.Router();

/*
This route mocks data that is returned from a Salesforce instance, the demo returns a json file for simplicity instead
 */
router.get("/ac-territories", acTerritoryController.getIndex);


module.exports = router;
