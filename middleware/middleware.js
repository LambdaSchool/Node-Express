const express = require("express");

const userRoutes = require("../users/userRoutes.js");
const postRoutes = require("../posts/postRoutes.js");

module.exports = server => {
  // causes express middleware
  // stack to be added to every layer (request function)
  server.use(express.json());

  // must be used when using express Router
  // links url with requests
  server.use("/users", userRoutes);
  server.use("/posts", postRoutes);
};
