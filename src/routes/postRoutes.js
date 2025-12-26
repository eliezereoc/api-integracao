import express from 'express';
import postController from '../controllers/postController.js';
const router = express.Router();

router.post('/sync/external', postController.fetchAndStorePosts);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);

export default router;