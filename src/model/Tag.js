const mongoose = require('@app/db')
const { Schema, model } = mongoose

const tagSchema = new Schema({
	tagName: {
		type: String,
		required: true,
		unique: true
	},
	articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
})

module.exports = model('Tag', tagSchema)
