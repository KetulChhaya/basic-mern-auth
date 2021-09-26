const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

//express instantiation
const app = express();

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//DB Conn
require("./db/conn");
//for getting req.body (JSON Response)
app.use(express.json());
app.use(cookieParser());
//link to the router
app.use(require("./routers/auth"));

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Sever is listening on port ${PORT}`);
});
