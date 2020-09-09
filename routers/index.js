const express = require('express');
const router = express.Router();
const multer = require("multer");
const { post } = require('./../function.js');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
      cb(null, true)
    } else {
      return cb(new Error('Only image are allowed!'))
    }
  }
}).single("inputFile01")

const upload2 = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
      cb(null, true)
    } else {
      return cb(new Error('Only image are allowed!'))
    }
  }
})
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
router.post("/add",  async (req, res) => {
  try {
  await upload(req, res, function (err) {
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
      return res.redirect("/posts");
      }
    });
  } catch (error) {
    res.json(error)
  }
})
router.post('/posts/addImage',upload2.single('file'),(req,res,next)=>{
    let jsonSend = {
        request: req.path,
        title: "AlexStack post admin/img/upload response",
        result: false,
        error: "",
        timestamp: Date.now(),
        data: null
    };
    if(req.files){
        console.log(req.files);
        jsonSend.result = true;
        jsonSend.data = req.files;
        res.send(jsonSend);
    } else if(req.file){
        console.log("file",req.file);
        jsonSend.result = true;
        jsonSend.data = req.file;
        res.send(jsonSend);
    }
    else{
        jsonSend.error = "no file uplaod";
        res.send(jsonSend);
    }

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
