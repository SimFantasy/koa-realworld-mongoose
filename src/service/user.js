const { User } = require('@model')

class UserService {
	// get user by id
	async getUserById(userId) {
		return await User.findById(userId)
	}

	// get user by username
	async getUserByName(username) {
		return await User.findOne({ username })
	}

	// get user by email
	async getUserByEmail(email) {
		return await User.findOne({ email })
	}

	// create user
	async createUser(user) {
		return await User.create(user)
	}
}

module.exports = new UserService()
