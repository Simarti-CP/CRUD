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
