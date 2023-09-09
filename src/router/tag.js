const Router = require('@koa/router')
const { getTags } = require('@controller/tag')
const router = new Router({
	prefix: `${process.env.ROUTER_PREFIX}/tags`
})

router.get('/', getTags)

module.exports = router
