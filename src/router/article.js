const Router = require('@koa/router')
const {
	getArticles,
	getFeedArticles,
	getArticle,
	createArticle,
	updateArticle,
	removeArticle,
	favoriteArticle,
	unFavoriteArticle
} = require('@controller/article')
const verifyAuth = require('@middleware/verifyAuth')

const router = new Router({
	prefix: `${process.env.ROUTER_PREFIX}/articles`
})
// get articles
router.get('/', verifyAuth(false), getArticles)
// get feed articles
router.get('/feed', verifyAuth(), getFeedArticles)
// get article
router.get('/:slug', verifyAuth(false), getArticle)
// create article
router.post('/', verifyAuth(), createArticle)
// update article
router.put('/:slug', verifyAuth(), updateArticle)
// remove article
router.delete('/:slug', verifyAuth(), removeArticle)
// favorite article
router.post('/:slug/favorite', verifyAuth(), favoriteArticle)
// unFavorite artilce
router.delete('/:slug/favorite', verifyAuth(), unFavoriteArticle)

module.exports = router
