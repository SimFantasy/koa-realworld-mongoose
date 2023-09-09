const Joi = require('joi')

module.exports = async (param, rule) => {
	const validatorSchema = Joi.object(rule)
	try {
		await validatorSchema.validateAsync(param, { abortEarly: false })
	} catch (error) {
		return (
			error.details.map(e => {
				const errorMsg = {}
				errorMsg[e.context.key] = e.message
				return errorMsg
			}) ?? '参数错误'
		)
	}
}
