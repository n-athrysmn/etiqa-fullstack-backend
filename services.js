import User from './model.js'

export const checkExistingUsername = async (username) => {
	const existingUser = await User.findOne({ username })
	return existingUser ? true : false
}

export const checkExistingEmail = async (email) => {
	const existingUser = await User.findOne({ email })
	return existingUser ? true : false
}

export const createUserDBService = (userDetails) => {
	console.log('userDetails:', userDetails) // Add this line
	return User.create(userDetails)
		.then(() => {
			return true
		})
		.catch((error) => {
			console.error('Error creating user:', error)
			return false
		})
}
