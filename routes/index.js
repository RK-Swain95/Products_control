const express = require("express");
const router = express.Router();
const homeControllerejs=require('../controllers/home_ejs_controller')

router.use("/api", require('./api/index'));
//3. Find the top five record based on popularity of all subcategory and show it on ejs
router.get('/toppopularity/:id',homeControllerejs.toppopularity);

//2. Find the ids of subcategory as mobile and title like LG or lg and show it on ejs
router.get('/showid/:id',homeControllerejs.showid);

//Home page
router.get('/',homeControllerejs.show);

module.exports = router;
