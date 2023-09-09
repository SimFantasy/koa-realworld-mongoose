const Joi = require('joi')
const handleValidator = require('@utils/handleValidator')

exports.creatreCommentValidator = async param => {
	const rules = {
		body: Joi.string().max(1000).required().messages({
			'string.max': '内容长度不能超过1000',
			'any.required': '内容不能为空'
		})
	}

	return await handleValidator(param, rules)
}
