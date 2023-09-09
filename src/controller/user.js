const userService = require('@service/user')
const { registerValidator, loginValidator, updateUserValidator } = require('@validator/user')
const handleMd5 = require('@utils/handleMd5')

class UserController {
	// register
	async register(ctx) {
		const { user } = ctx.request.body

		const userValidator = await registerValidator(user)
		if (userValidator) {
			ctx.throw(400, { message: userValidator })
		}

		const nameExist = await userService.getUserByName(user.username)
		if (nameExist) {
			ctx.throw(400, { message: '用户名已存在' })
		}

		const emailExist = await userService.getUserByEmail(user.email)
		if (emailExist) {
			ctx.throw(400, { message: '邮箱已存在' })
		}

		const newUser = await userService.createUser(user)

		ctx.body = {
			user: await newUser.toUserJson()
		}
	}

	// login
	async login(ctx) {
		const { user } = ctx.request.body

		const userValidator = await loginValidator(user)
		if (userValidator) {
			ctx.throw(400, { message: userValidator })
		}

		const userExist = await userService.getUserByEmail(user.email)
		if (!userExist) {
			ctx.throw(400, { message: '用户不存在' })
		}

		if (userExist.password !== handleMd5(user.password)) {
			ctx.throw(400, { message: '密码错误' })
		}

		ctx.body = {
			user: await userExist.toUserJson()
		}
	}

	// get current user
	async getCurrentUser(ctx) {
		const loginUser = ctx.user

		const user = await userService.getUserById(loginUser.id.toString())
		if (!user) {
			ctx.throw(400, { message: '用户不存在' })
		}

		ctx.body = {
			user: await user.toUserJson()
		}
	}

	// update current user
	async updateCurrentUser(ctx) {
		const { user } = ctx.request.body

		const userValidator = await updateUserValidator(user)
		if (userValidator) {
			ctx.throw(400, { message: userValidator })
		}

		const target = await userService.getUserById(ctx.user.id.toString())
		if (!target) {
			ctx.throw(400, { message: '用户不存在' })
		}

		if (user.username) {
			target.username = user.username
		}

		if (user.email) {
			target.email = user.email
		}

		if (user.password) {
			target.password = handleMd5(user.password)
		}

		if (typeof user.bio !== 'undefined') {
			target.bio = user.bio
		}

		if (typeof user.image !== 'undefined') {
			target.image = user.image
		}

		await target.save()

		ctx.body = {
			user: await target.toUserJson()
		}
	}
}

module.exports = new UserController()
