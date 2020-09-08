const express = require('express');
const router = express.Router();
const multer = require("multer");
const { post } = require('./../function.js');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
});
var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log(file);
    if (file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
      cb(null, true)
    } else {
      return cb(new Error('Only image are allowed!'))
    }
  }
}).single("inputFile01");
//get all posts
router.get("/", async (req, res) => {
  try {
    const data = await post.set({}, "");
    return res.render("index", { data });
  } catch (error) {
    res.json(error)
  }
});
//add 1 posts
router.get("/add", async (req, res) => {
  try {
    const data = await post.set({}, "");
    return res.render("index", { data });
  } catch (error) {
    res.json(error)
  }
});
//post 1 posts
router.post("/add", async (req, res) => {
  try {
  await  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("A Multer error occurred when uploading.");
    } else if (err) {
      console.log("An unknown error occurred when uploading." + err);
    }else {
        const data = post.create({
          title: req.body.title,
          image: req.file.filename,
          content: req.body.content,
          description: req.body.description,
        }); 
      return res.render("index", { data });
      }
      
    });
  } catch (error) {
    res.json(error)
  }
})
 
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
