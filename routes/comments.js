const express = require("express");
const router = express.Router();
const { Comment, validateComment } = require("../models/comment");
const { Reply, validateReply } = require("../models/reply");

// ! GET ALL COMMENTS (10 min)

// ! GET A COMMENT BY ID (10 min)
// ! POST NEW COMMENT TO COMMENTS (20-30 min)
router.post("/", async (req, res) => {
  try {
    let newComment = await new Comment(req.body);
    await newProduct.save();
    return res.status(201).send(newComment);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// ! UPDATE AN EXISTING LIKES / DISLIKES FOR COMMENT BY ID (20-30 min)
// ! DELETE A COMMENT BY ID (10 min)
// ! POST NEW REPLY TO COMMENT BY COMMENT ID (30-40 min)

module.exports = router;