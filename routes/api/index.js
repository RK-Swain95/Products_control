const express = require("express");

const router = express.Router();

const homeController= require('../../controllers/api/home_controller');


//1. Find the list of subcategory as mobile and title like LG or lg.
router.get('/lgmobile/:id',homeController.sublg);

//2. Find the ids of subcategory as mobile and title like LG or lg.
router.get('/mobileid/:id',homeController.idlg);

//3.Find the top five record based on popularity of all subcategory.
router.get('/popularity/:id',homeController.popularity);

//4. find the mobile and no of record whose price range is between 2000 to 9500 and mobile will be like Nokia and Zen and Xolo
router.get('/nokiaxolo/:id',homeController.mobileRange);

//5. find the product of all subcategory whose popularity is less than 500;
router.get('/lesspopularity/:id',homeController.lesspopularity);

//6. find the total record and all subcategory product record.
router.get('/subcategory/:id',homeController.subcount);

//7. find the price of smart-watches subcategory whose price is greater than 10000 and sort by popularity high to low
router.get('/smartwatch/:id',homeController.smartwatch);

//To store data in database
router.get('/getData', homeController.allData);

 
module.exports = router;