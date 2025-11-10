const express = require('express');
const router = express.Router();
const crudController = require('../controllers/crudController');
const validateData = require('../middleware/validationMiddleware');
const multiUpload = require('../middleware/uploadMiddleware');
const { postSchemas } = require('../schemas/postSchemas');
const { postUpdation } = require('../schemas/postSchemas');

//app.use(express.json());
router.get('/', crudController.getAllPosts);
router.get('/:id', crudController.getPostbyId);
router.post('/', multiUpload, validateData(postSchemas), crudController.createPost);
router.put('/:id', multiUpload, validateData(postUpdation), crudController.updatePostbyId);
router.delete('/:id', crudController.deletePostbyId);

module.exports = router;