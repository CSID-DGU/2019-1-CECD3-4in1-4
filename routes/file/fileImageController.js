//fileImage controller

//use mysqlPool
var mysqlPool = require('../../middlewares/mysqlPool.js');
var moment = require('moment');
var fileUpload = require('../../middlewares/fileUpload.js');

exports.getMain = (req,res)=>{
    mysqlPool.pool.getConnection((err, connection) => {
        if (err) { //throw err;
            console.error('getConnection err : ' + err);
            return;
        }
        //use connection
        var query = "SELECT file_id, file_name FROM file;";

        connection.query(query, null, (error, results, fields) => {
            connection.release();

            if (error) { //throw error;
                console.error('query error : ' + error);
                res.send('fail');
                return;
            }

            //use results and fields
            res.render('file/main', {
                fileInfo: results,
                moment: moment,
                curDate: new Date()
            });
        });
    });
};


exports.postFiles = (req,res)=>{
    var fileInfo = {
        path: 'public/FileList/',
        namePrefix: 'upFil',
        viewNames: ['imgFile']
    };
    fileUpload(fileInfo).multipartForm(req, res, (err) => {
        if(err) {
            return;
        }
        let file_info = {
            file_id:'f'+moment(Date()).format('YYYYMMDDhhmmss'),
            file_name:req.files['imgFile'],
            file_type:req.files['imgFile'],
            file_date:moment(Date()).format('YYYYMMDDhhmmss')
        };
        if(req.files['imgFile'] !== undefined) {
            file_info.file_name = req.files['imgFile'][0].path;
        }
        //get connection from pool
        mysqlPool.pool.getConnection((err, connection) => {
            if(err) { //throw err;
                console.error('getConnection err : ' + err);
                return;
            }

            var query = "insert into file ";
            query += " set ?";
            //use connection
            connection.query(query, file_info, (error, results, fields) => {
                connection.release();

                if(error) { //throw error;
                    console.error('query error : ' + error);
                    return;
                }

                // var way = '/file/main/';
                res.redirect('/file/main/');
            });
        });
    });
};

//
//     var fileInfo = {
//         path: 'public/FileList/',
//         namePrefix: 'PRJPL',
//         viewNames: ['ProjectPlanFile']
//     };
//     fileUpload(fileInfo).multipartForm(req, res, (err) => {
//         var project_plan_report = {
//             file_name : req.body.imgFile
//
//         };
//
//         //get connection from pool
//         mysqlPool.pool.getConnection((err, connection) => {
//             if(err) { //throw err;
//                 console.error('getConnection err : ' + err);
//                 return;
//             }
//
//             var query = "insert into file ";
//             query += " set ?";
//             //use connection
//             connection.query(query, project_plan_report, (error, results, fields) => {
//                 connection.release();
//
//                 if(error) { //throw error;
//                     console.error('query error : ' + error);
//                     return;
//                 }
//                 console.log(req.body.imgFile+'================');
//                 var way = '/file/main'+req.body.imgFile;
//                 res.redirect(way);
//             });
//         });
//     });
// };