const Router = require('@koa/router')
const { getComments, createComment, removeComment } = require('@controller/comment')
const verifyAuth = require('@middleware/verifyAuth')
const router = new Router({
	prefix: `${process.env.ROUTER_PREFIX}/articles`
})

router.get('/:slug/comments', verifyAuth(false), getComments)

router.post('/:slug/comments', verifyAuth(), createComment)

router.delete('/:slug/comments/:commentId', verifyAuth(), removeComment)

module.exports = router
