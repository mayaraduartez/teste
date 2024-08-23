const express = require("express");
const router = express.Router();
const principalController = require("../controllers/principalController"); 

router.get('/', principalController.principal);

router.get('/favoritos', principalController.favoritos); 


module.exports = router;