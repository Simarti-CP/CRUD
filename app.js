const express = require ("express");
const app = express();

const axios = require("axios");

require("dotenv").config({path: "dev.env"});

app.get("/api/get", async(req, res) => {
    try{
    const res = await axios.get("");
    res.send(res);
    }
    catch(err){
        return res.send({error: "Error"});
    }
});

app.get("/api/get/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const res = await axios.get("/${id}");
        if(!res?.id) return res.send("Not Found"); 

        return res.send(res);
    }
    catch(err){
        return res.send("Error");
    }
})

app.post("/api/create", async(req, res) => {
    try{
    let posts = [];
    const res = await axios.get("");
    posts = res.data;
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newPost = {
        id, userId, title, body
    }
    posts.push(newPost);
    return res.send({
        message: "Post created",
        post: newPost 
    });
    }catch(err){
        res.send("Error");
    }
    

});

app.put("/api/update/:id", async(req, res) => {
    try{
    const id = parseInt(req.params.id);
    const res = await axios.get("");
    const {title, body} = req.body;
    const post = res.data.find(p => p.id === id);
    if(!post) return res.send("Post not found");
    post.title = title || post.title;
    post.body = body || post.body;
    return res.send({
        message: "Edited",
        post
    });
    }catch(err){
        res.send({error: "Error"});
    }
});

app.delete("/api/delete/:id", async(req, res) => {
    try{
        let posts = [];
        const id = parseInt(req.params.id);
        const res = await axios.get("");
        posts = req.data;
        const post = posts.data.find(p => p.id === id);
        if(!post) return res.send("Post not found");

        posts.filter(p => p.id !== id);
        return res.send({
            message: "Deleted",
            post: post
        });

    }catch(err){
        res.send("Error");
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server running on port: "+ process.env.PORT);
})