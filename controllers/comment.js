const Comment = require('../models/Comment')
const Post = require('../models/Post')

async function addComment(postId, comment) {
  const newComment = await Comment.create(comment)

  await Post.findByIdAndUpdate(postId, {$push: {comments: newComment}})

  await newComment.populate('author')

  return newComment
}

async function deleteComment(postId, comment) {
  await Comment.deleteOne({_id: comment.id})

  await Post.findByIdAndUpdate(postId, {$pull: {comments: comment}})
}


module.exports = {
  addComment,
  deleteComment,
}


