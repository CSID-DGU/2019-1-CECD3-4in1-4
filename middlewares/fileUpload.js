//use multer
var multer = require('multer');
var path = require('path');
var moment = require('moment');

//fileInfo: path, namePrefix, viewNames
module.exports = (fileInfo) => {
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, fileInfo.path);
    }, filename: (req, file, cb) => {
      cb(null, moment().format('YYYYMMDDHHmmss') + file.originalname);
    }
  });


  router.post('/', upload.single('user_file'), function(req, res, next){

  });

  var viewNameArray = new Array(fileInfo.viewNames.length);

  for(var i = 0; i < fileInfo.viewNames.length; i++) {
    viewNameArray[i] = {name: fileInfo.viewNames[i]};
  }

  var multipartForm = multer({ storage: storage}).fields(viewNameArray);

  return {
    multipartForm: multipartForm
  };
};
