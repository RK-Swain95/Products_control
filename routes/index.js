const express = require("express");

const router = express.Router();
const homeControllerejs=require('../controllers/home_ejs_controller')
// router.use("/api", apiLimiter);
router.use("/api", require('./api/index'));

router.get('/toppopularity/:id',homeControllerejs.toppopularity);

router.get('/showid/:id',homeControllerejs.showid);


router.get('/',homeControllerejs.show);

module.exports = router;
