const express = require('express');
const router = express.Router();
const {post} = require('./../function.js');
//get all posts
router.get("/", async (req, res) => {
  res.json(await post.set({}, ""))
});
//post 1 posts
router.post("/add", async (req, res) => {
  res.json(await post.create(req.body))
});
//delete id post
router.get("/test", async (req, res) => {
  res.render('index')
});

//get id post
router.get("/:id", async (req, res) => {
  res.json(await post.get({ _id: req.params.id }, ''))
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
