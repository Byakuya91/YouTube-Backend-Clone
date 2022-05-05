const express = require("express");
const router = express.Router();
const { Comment, validateComment } = require("../models/comment");
const { Reply, validateReply } = require("../models/reply");

//  COMMENT ENDPOINTS
// ! GET ALL COMMENTS (COMPLETED)
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

// ! GET A COMMENT BY ID  (COMPLETED)
//http://localhost:3007/api/comments/:commentId
router.get("/:commentId", async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.commentId);
    if (!comment)
      return res
        .status(400)
        .send(`Comment with ObjectId: ${req.params.commentId}does not exist!`);
    return res.status(200).send(comment);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// GET comments by VIDEOId(IN PROGRESS)
router.get("/byvideoid/:videoId", async (req, res) => {
  try {
    // grab all the comments in the document.
    let comments = await Comment.find({ videoID: req.params.videoId });
    if (!comments)
      return res
        .status(400)
        .send(
          `No comments with videoID: ${req.params.videoId} exist in this collection!`
        );
    return res.send(comments);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// ! POST NEW COMMENT TO COMMENTS  (COMPLETED )
router.post("/", async (req, res) => {
  try {
    const { error } = validateComment;
    if (error) return res.status(400).send(error);
    let newComment = await new Comment(req.body);
    await newComment.save();
    let comments = await Comment.find();
    return res.status(201).send(comments);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

//   UPDATE A comment by Id, including its Likes/Dislikes (COMPLETED)
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

// ! DELETE A COMMENT BY ID COMPLETED
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
// ! POST NEW REPLY TO COMMENT BY COMMENT ID COMPLETED
// http://localhost:3007/api/commentsId/replyId
router.post("/:commentId/replies", async (req, res) => {
  try {
    // checking if there is a valid reply
    const { error } = validateReply;
    if (error) return res.status(400).send(error);

    // grabing a reply from a user
    const newReply = await new Reply(req.body);

    // grabbing the comment from the document.
    const comment = await Comment.findById(req.params.commentId);
    //  checking if there is a comment
    if (!comment)
      return res
        .status(400)
        .send(`Comment with ObjectId: ${req.params.commentId}does not exist!`);

    // add reply to the comment document
    comment.replies.push(newReply);
    //  saving the comment and then sending a response
    await comment.save();
    return res.send(comment.replies);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

module.exports = router;
