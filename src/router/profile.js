const Router = require('@koa/router')
const { getProfile, followUser, unFollowUser } = require('@controller/profile')
const verifyAuth = require('@middleware/verifyAuth')

const router = new Router({
	prefix: `${process.env.ROUTER_PREFIX}/profiles`
})
// get user profile
router.get('/:username', verifyAuth(false), getProfile)
// follow user
router.post('/:username/follow', verifyAuth(), followUser)
// unfollow user
router.delete('/:username/follow', verifyAuth(), unFollowUser)

module.exports = router
