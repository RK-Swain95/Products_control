const express = require("express");

const router = express.Router();
// router.use( apiLimiter);
const homeController= require('../../controllers/api/home_controller');

router.get('/getData', homeController.allData);
 router.get('/popularity/:id',homeController.popularity);
 router.get('/lesspopularity/:id',homeController.lesspopularity);
 router.get('/nokiaxolo/:id',homeController.mobileRange);
 router.get('/smartwatch/:id',homeController.smartwatch);
 router.get('/lgmobile/:id',homeController.sublg);
 router.get('/mobileid/:id',homeController.idlg);
 router.get('/subcategory/:id',homeController.subcount);


 router.get('/',homeController.show);
 router.post('/showid/:id',homeController.showid);

module.exports = router;