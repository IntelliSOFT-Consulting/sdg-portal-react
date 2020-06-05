// module.exports = (app) =>{
//     const files = require('../controllers/file.controller.js');

//     //Create new file
//     app.post('/files', files.create);

//     // Retrieve all files
//     app.get('/files', files.findAll);

//     // Retrieve a single file with fileId
//     app.get('/files/:fileId', files.findOne);

//     // Update a Note with noteId
//     app.put('/files/:fileId', files.update);

//     // Delete a Note with noteId
//     app.delete('/files/:fileId', files.delete);
// }

let router = require('express').Router();

//Default route
router.get('/', function(req, res){
    res.json({
        status: "API working", 
        message: 'Welcome to the REST API'
    });
});

const auth = require('../../middleware');

//Import controller
const fileController = require('../controllers/file.controller.js');
const userController = require('../controllers/user.controller.js');

router.route('/files')
    .get(fileController.findAll)
    .post(auth, fileController.create);

router.route('/file/:id').get(fileController.findOne);
router.route('/file/:id').delete(fileController.delete);

router.route('/user/create').post(userController.create);
router.route('/user/authenticate').post(userController.authenticate);

router.route('/user/checkToken').get(auth, userController.withAuth);
router.route('/user/logout').get(userController.logOut);
router.route('/user/readCookie').get(userController.readCookie);


module.exports = router;