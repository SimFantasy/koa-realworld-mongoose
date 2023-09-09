const jwt = require('jsonwebtoken')

exports.jwtSign = payload => {
	return jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	})
}

exports.jwtVerify = token => {
	return jwt.verify(token, process.env.JWT_SECRET)
}
