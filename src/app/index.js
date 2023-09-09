const path = require('path')
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const Router = require('@koa/router')
const dotenv = require('dotenv')
const error = require('koa-json-error')
const requireDirectory = require('require-directory')

dotenv.config()

require('@app/db')

const app = new Koa()
app.use(
	error({
		postFormat: (e, { stack, ...rest }) =>
			process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
	})
)
app.use(bodyparser())

requireDirectory(module, path.resolve(__dirname, '../router'), {
	visit: obj => {
		if (obj instanceof Router) {
			app.use(obj.routes()).use(obj.allowedMethods())
		}
	},
	exclude: /\/index.js/
})

module.exports = app
