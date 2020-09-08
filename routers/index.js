const express = require('express');
const router = express.Router();
const {post} = require('./../function.js');
//get all posts
router.get("/", async (req, res) => {
  const data = await post.set({}, "");
  return res.render("index", {data});
});
//post 1 posts
router.get("/add", async (req, res) => {
  return res.render("index");
});
//post 1 posts
router.post("/add", async (req, res) => {
  res.json(await post.create(req.body))
});
//get id post
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await post.get({ _id: id }, ""));
});
//update id post
router.put("/:id", async (req, res) => {
  res.json(await post.set({ _id: req.params.id }, req.body))
});
//delete id post
router.delete("/:id", async (req, res) => {
  res.json(await post.del({ _id: req.params.id }));
});

module.exports = router;
