const express = require("express");
const router = express.Router();
const { Comment, validateComment } = require("../models/comment");
const { Reply, validateReply } = require("../models/reply");

//  COMMENT ENDPOINTS
// ! GET ALL COMMENTS (10 min) (COMPLETED)
// http://localhost:3007/api/comments
router.get("/", async (req, res) => {
  try {
    let comments = await Comment.find();
    if (!comments)
      return res.status(400).send(`No comments in this collection!`);
    return res.status(200).send(comments);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// ! GET A COMMENT BY ID (10 min)  (COMPLETED)
//http://localhost:3007/api/comments/:commentId
router.get("/:commentId", async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.commentId);
    if (!comment)
      return res
        .status(400)
        .send(`Product with ObjectId: ${req.params.commentId}does not exist!`);
    return res.status(200).send(comment);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// ! POST NEW COMMENT TO COMMENTS (20-30 min) (COMPLETED )
router.post("/", async (req, res) => {
  try {
    const { error } = validateComment;
    if (error) return res.status(400).send(error);
    let newComment = await new Comment(req.body);
    await newComment.save();
    return res.status(201).send(newComment);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

//   UPDATE A comment by Id
// https://localhost:3007/api/comments/:commentId
router.put("/:commentId", async (req, res) => {
  try {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error);

    let comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    );
    if (!comment)
      return res
        .status(400)
        .send(`Comment  with Objectid ${req.params.commentId} does not exist.`);
    return res.send(comment);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// ! UPDATE AN EXISTING LIKES / DISLIKES FOR COMMENT BY ID (20-30 min) (SAVING UNTIL LATER)

// ! DELETE A COMMENT BY ID (10 min)
router.delete("/:commentId", async (req, res) => {
  try {
    let comment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!comment)
      return res
        .status(400)
        .send(`Product with ObjectId: ${req.params.commentId}does not exist!`);
    return res.send(comment);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// REPLIES ENDPOINTS
// ! POST NEW REPLY TO COMMENT BY COMMENT ID (30-40 min)
// http://localhost:3007/api/commentsId/replyId

module.exports = router;
