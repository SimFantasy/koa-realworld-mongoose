const { Article, Comment } = require('@model')

class CommentService {
	// get comment by id
	async getCommentById(id) {
		return await Comment.findById(id)
	}

	// create comment
	async createComment(comment) {
		return await Comment.create(comment)
	}

	// remove comment
	async removeComment(commentId) {
		return await Comment.deleteOne({ _id: commentId })
	}
}

module.exports = new CommentService()
