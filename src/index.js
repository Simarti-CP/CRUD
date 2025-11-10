/*const express = require("express");
const postRoutes = require('./routes/app');
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
require('dotenv').config({ path: 'dev.env'});

app.use(express.json());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/post", postRoutes);
/*
app.use('/api/get-posts', postRoutes);
app.use('/api/get-post/:id', postRoutes);
app.use('/api/create-post', postRoutes);
app.use('/api/update-post/:id', postRoutes);
app.use('/api/delete-post/:id', postRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server running on port: '+ process.env.PORT); 
});
*/
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const routes = require("./routes/app");

dotenv.config({ path: "dev.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/posts", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
