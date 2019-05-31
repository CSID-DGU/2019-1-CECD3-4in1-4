var express = require('express');
var router = express.Router();

var controller = require('./fileImageController.js');


router.route('/main')
    .get(controller.getMain);

router.route('/upload')
    .post(controller.postFiles);



module.exports = router;