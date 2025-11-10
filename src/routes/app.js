const express = require('express');
const router = express.Router();
const crudController = require('../controllers/crudController');

const multiUpload = require('../middleware/uploadMiddleware');
const { postSchemas } = require('../schemas/postSchemas');
const { postUpdation } = require('../schemas/postSchemas');

router.get('/', crudController.getAllPosts);
router.get('/:id', crudController.getPostbyId);
router.post('/', multiUpload, crudController.createPost);
router.put('/:id', multiUpload, crudController.updatePostById);
router.delete('/:id', crudController.deletePostbyId);

module.exports = router;