//fileDownload controller

//use path
var path = require('path');

var fs = require('fs');
var rimraf = require('rimraf')
//file download
exports.getFileDownload = (req, res) => {
  var fileFolder = req.params.fileFolder;
  var fileName = req.params.fileName;

  res.download('public/' + '/' + fileFolder + '/' + fileName, fileName);
};


//file download
exports.getFileDownloadWant = (req, res) => {
  var fileFolder = req.params.fileFolder;
  var fileName = req.params.fileName;

  res.download('public/' + '/' + fileFolder + '/' + fileName, fileName.substring(14));
};

exports.getFileDownloadTransferedFile = (req, res) => {
  console.log('download transfer file')
    var fileFolder = req.params.fileFolder;
    var fileName = req.params.fileName;
    var zipPath = '/home/dev/sd/public/'+fileFolder+'/'+fileName;
    var dirPath = zipPath.split('.zip')[0]

    // var file = fs.createWriteStream(zipPath);
    // file.pipe(res)
    // file.on('finish',function(){
    //   console.log('delete files');
    //   fs.unlink(zipPath);
    //   fs.unlink(dirPath);
    //   file.close(cb);
    // });
    //
    res.on('finish',function(){
        console.log('delete transfered file')
        if(fs.existsSync(zipPath)){
            fs.unlinkSync(zipPath);
            rimraf(dirPath, function () { console.log('done'); });
        }
    })

    res.download('public/' + '/' + fileFolder + '/' + fileName, fileName);



};
