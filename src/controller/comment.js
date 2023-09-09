const articleService = require('@service/article')
const userService = require('@service/user')
const commentService = require('@service/comment')
const { creatreCommentValidator } = require('@validator/comment')

class CommentController {
	// get comments
	async getComments(ctx) {
		const { slug } = ctx.params

		const article = await articleService.getArticleBySlug(slug)
		if (!article) {
			ctx.throw(404, { message: '文章不存在' })
		}

		if (ctx.user) {
			const loginUser = await userService.getUserById(ctx.user._id.toString())
			ctx.body = {
				comments: await Promise.all(
					article.comments.map(async commentId => {
						const comment = await commentService.getCommentById(commentId)
						return await comment.toCommentJson(loginUser)
					})
				)
			}
		} else {
			ctx.body = {
				comments: await Promise.all(
					article.comments.map(async commentId => {
						const comment = await commentService.getCommentById(commentId)
						return await comment.toCommentJson(false)
					})
				)
			}
		}
	}

	// create comment
	async createComment(ctx) {
		const { slug } = ctx.params
		const { comment } = ctx.request.body

		const target = await articleService.getArticleBySlug(slug)
		if (!target) {
			ctx.throw(404, { message: '文章不存在' })
		}

		const commentValidator = await creatreCommentValidator(comment)
		if (commentValidator) {
			ctx.throw(400, { message: commentValidator })
		}

		const commenter = await userService.getUserById(ctx.user._id.toString())

		const newComment = await commentService.createComment({
			body: comment.body,
			article: target._id.toString(),
			author: commenter._id.toString()
		})

		await target.addComment(newComment._id)

		ctx.body = {
			comment: await newComment.toCommentJson(commenter)
		}
	}

	// remove comment
	async removeComment(ctx) {
		const { slug, commentId } = ctx.params

		const target = await articleService.getArticleBySlug(slug)
		if (!target) {
			ctx.throw(404, { message: '文章不存在' })
		}

		const commenter = await userService.getUserById(ctx.user._id.toString())
		if (!commenter) {
			ctx.throw(400, { message: '用户不存在' })
		}

		const comment = await commentService.getCommentById(commentId)

		if (commenter._id.toString() !== comment.author.toString()) {
			ctx.throw(403, { message: '没有权限' })
		} else {
			await target.removeComment(comment._id)
			await commentService.removeComment(comment._id)

			ctx.body = {
				code: 201,
				message: '删除成功'
			}
		}
	}
}

module.exports = new CommentController()
