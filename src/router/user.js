const Router = require('@koa/router')
const { register, login, getCurrentUser, updateCurrentUser } = require('@controller/user')
const verifyAuth = require('@middleware/verifyAuth')
const router = new Router({
	prefix: `${process.env.ROUTER_PREFIX}`
})
// register
router.post('/users', register)
// login
router.post('/users/login', login)
// get current user
router.get('/user', verifyAuth(), getCurrentUser)
// update current user
router.put('/user', verifyAuth(), updateCurrentUser)

module.exports = router
