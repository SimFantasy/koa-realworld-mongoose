const { User, Article, Comment } = require('@model')

class ArticleService {
	// get articles
	async getArticles(skip, limit, query) {
		console.log('service query', query)
		return await Article.find(query).skip(skip).limit(limit).sort({ createAt: -1 })
	}

	// get articles count
	async getArticlesCount(query) {
		return await Article.countDocuments(query)
	}

	// get article by slug
	async getArticleBySlug(slug) {
		return await Article.findOne({ slug })
	}

	// create article
	async createArticle(article) {
		return await Article.create(article)
	}

	// get tags
	async getTags() {
		return await Article.find().distinct('tagList')
	}
}

module.exports = new ArticleService()
