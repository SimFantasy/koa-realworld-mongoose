const cryprto = require('crypto')

module.exports = str => {
	return cryprto
		.createHash('sha256')
		.update(str + process.env.MD5_SALT)
		.digest('hex')
}
