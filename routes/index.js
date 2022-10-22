const express = require("express");
const router = express.Router();
const homeControllerejs=require('../controllers/home_ejs_controller')

router.use("/api", require('./api/index'));

//Home page
router.get('/',homeControllerejs.show);

//1. Find the list of subcategory as mobile and title like LG or lg.
router.get('/sublg/:id',homeControllerejs.sublg);

//2. Find the ids of subcategory as mobile and title like LG or lg and show it on ejs
router.get('/showid/:id',homeControllerejs.showid);

//3. Find the top five record based on popularity of all subcategory and show it on ejs
router.get('/toppopularity/:id',homeControllerejs.toppopularity);

//4. find the mobile and no of record whose price range is between 2000 to 9500 and mobile will be like Nokia and Zen and Xolo
router.get('/nokiaxolo/:id',homeControllerejs.mobileRange);

//5. find the product of all subcategory whose popularity is less than 500;
router.get('/lesspopularity/:id',homeControllerejs.lesspopularity);

module.exports = router;
