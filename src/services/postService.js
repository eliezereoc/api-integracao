import axios from "axios";
import * as postRepository from "../repositories/postRepository.js";
import dotenv from "dotenv/config";

async function fetchAndStorePosts() {
  try {
    const response = await axios.get(`${process.env.API_EXTERNAL_URL}/posts`);
    const posts = response.data;

    for (const post of posts) {
      await postRepository.createPost(post);
    }

    return {
      status: "success",
      message: "Posts obtidos e armazenados com sucesso.",
    };
  } catch (error) {
    throw { status: 500, message: error.message };
  }
}

async function getPostsByUserId(userId) {
  try {
    const posts = await postRepository.getPostsByUserId(userId);
    return posts;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
}

async function getAllPosts() {
  try {
    const posts = await postRepository.getPostsAll();
    return posts;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
}

async function createPost(post) {
  try {
    if (!post || !post.userId || !post.title || !post.body) {
      throw new Error('userId, title e body são obrigatórios');
    }
    const result = await postRepository.createPost(post);
    return result;
  } catch (error) {
    throw { status: 400, message: error.message };
  }
}

async function getPostById(postId) {
  try {
    const posts = await postRepository.getPostsByUserId(postId);
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
}

export default {
  fetchAndStorePosts,
  getPostsByUserId,
  getAllPosts,
  createPost,
  getPostById,
};
