//use multer
var multer = require('multer');
var path = require('path');
var moment = require('moment');
const Storage = require('@google-cloud/storage');
const storage = new Storage({
  projectId: 'My First Project',
  keyFilename: 'config/My First Project-14b55a6edafc.json'
});
//fileInfo: path, namePrefix, viewNames
module.exports = (fileInfo) => {
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, fileInfo.path);
    }, filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
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


