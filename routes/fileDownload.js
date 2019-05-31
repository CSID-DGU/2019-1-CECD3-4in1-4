var express = require('express');
var router = express.Router();

var controller = require('./fileDownloadController.js');

//file download
router.route('/:fileFolder/:fileName')
  .get(controller.getFileDownload);



//file download
router.route('/:fileFolder/:fileName/want')
  .get(controller.getFileDownloadWant);

router.route('/:fileFolder/:fileName/transfer')
    .get(controller.getFileDownloadTransferedFile);

module.exports = router;
