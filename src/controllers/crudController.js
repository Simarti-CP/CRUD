const express = require("express");
const app = express();
const { postSchemas } = require('../schemas/postSchemas');
const { postUpdation } = require('../schemas/postSchemas');

require('dotenv').config({ path: 'dev.env'});
const axios = require("axios");

app.get("/api/get", (req, res) => {
    return res.send("Hello World");
});

exports.getAllPosts = async (req, res) => {
    try{
    const response = await axios('https://jsonplaceholder.typicode.com/posts');
    return res.send(response.data);
    }
    catch (err){
        res.status(500).send({error: "Failed to fetch posts"});
        console.log(err);
    }
};

exports.getPostbyId = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        console.log(id);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const post = response.data;

        if(!post?.id) return res.status(404).send("Post not found");

        console.log(post);
    
        return res.send(post);
    
    }catch(err){
        res.status(500).send({error: "Falied to fetch post"});
    }
};

exports.createPost = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const validatedData = postSchemas.parse(req.body);

    const { userId, title, body } = validatedData;

    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newPost = { id, userId, title, body };

    if (req.files) {
        console.log("Uploaded files:", req.files);
      }

      posts.push(newPost);

    return res.status(201).json({
      message: "Post created successfully",
      data: newPost,
      files: req.files || []
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors
      });
    }

    console.error("Error creating post:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.updatePostById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const validation = postUpdation.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.error.errors.map(err => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    const { title, body } = validation.data;

    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const existingPost = response.data;

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = {
      ...existingPost,
      title: title || existingPost.title,
      body: body || existingPost.body,
    };

    return res.status(200).json({
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).json({
      message: "Internal server error",
      details: error.message,
    });
  }
};

exports.deletePostbyId = async (req, res) => {
    try{
        let posts = []; 
        const id = parseInt(req.params.id);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
        posts = response.data;
        console.log(response.data);
        console.log(posts);
        console.log(id);
        const post = posts.find(p => p.id === id);
        
        if (!post) return res.send({error: "post not found"});

        posts.filter(p => p.id !== id);
        return res.send({
            message: "Post deleted",
            post: post
        });

    }
    catch(err){
        res.status(500).send({error: "Error"});
        console.log(err);
    };

};