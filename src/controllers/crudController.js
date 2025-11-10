const express = require("express");
const app = express();


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

exports.createPost = [
  async (req, res) => {
    try {
      const { userId, title, body } = req.body;

      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      const posts = response.data;

      const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
      const newPost = { id, userId, title, body };

      if (req.files) {
        console.log("Uploaded files:", req.files);
      }

      posts.push(newPost);

      return res.status(201).json({
        message: "Post Created Successfully",
        post: newPost,
        uploadedFiles: req.files || []
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
];

exports.updatePostbyId =  async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);

        const {title, body} = req.body;
        
        const post = response.data.find(p => p.id === id);

        if (!post) return res.send("Post not found");

        post.title = title || post.title;
        post.body = body || post.body;

        return res.send({
            message: "Post Updated",
            post
        });

    }catch(err){
       return res.status(500).send({error: "Error"});
       console.log(err);
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