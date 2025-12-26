import postService from '../services/postService.js';

export const fetchAndStorePosts = async (req, res) => {
    try {
        const result = await postService.fetchAndStorePosts();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const postData = req.body;
        const newPost = await postService.createPost(postData);
        res.status(201).json(newPost);
    } catch (error) {
        const statusCode = error.status || 500;
        res.status(statusCode).json({ error: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await postService.getPostById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
export const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};  

export default {
    fetchAndStorePosts,
    createPost,
    getPostById,
    getAllPosts
};