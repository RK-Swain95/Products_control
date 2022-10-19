const express = require("express");

const router = express.Router();
// router.use( apiLimiter);
const homeController= require('../../controllers/api/home_controller');

router.get('/getData', homeController.allData);


module.exports = router;