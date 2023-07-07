import {
	createUserDBService,
	checkExistingUsername,
	checkExistingEmail,
} from './services.js'
import User from './model.js'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
	try {
		const { username, email, password, phone, hobby, skills } = req.body

		// Check if username already exists
		const existingUsername = await checkExistingUsername(username)
		if (existingUsername) {
			return res.send({ status: false, message: 'Username already exists' })
		}

		// Check if email already exists
		const existingEmail = await checkExistingEmail(email)
		if (existingEmail) {
			return res.send({ status: false, message: 'Email already exists' })
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10)

		// If both username and email are unique, create the user with hashed password
		const status = await createUserDBService({
			username,
			email,
			phone,
			hobby,
			skills,
			password: hashedPassword,
		})
		if (status) {
			res.send({ status: true, message: 'User created successfully' })
		} else {
			res.send({ status: false, message: 'Error creating user' })
		}
	} catch (error) {
		if (error.code === 11000) {
			res.send({
				status: false,
				message: 'Duplicate key error. User already exists.',
			})
		} else {
			res.send({ status: false, message: 'Error creating user' })
		}
	}
}

export const login = async (req, res) => {
	try {
		const { email, password } = req.body

		// Check if user with the provided email exists
		const user = await User.findOne({ email })
		if (!user) {
			return res.send({ status: false, message: 'User not found' })
		}

		// Compare the provided password with the hashed password in the database
		const passwordMatch = await bcrypt.compare(password, user.password)
		if (!passwordMatch) {
			return res.send({ status: false, message: 'Invalid password' })
		}

		// If email and password match, user is authenticated
		res.send({ status: true, message: 'Login successful' })
	} catch (error) {
		res.send({ status: false, message: 'Error during login' })
	}
}

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find()
		res.send({ status: true, message: 'Users retrieved successfully' })
	} catch (error) {
		console.log('Error retrieving users:', error)
		res.send({ status: false, message: 'Error retrieving users' })
	}
}

export const updateUser = async (req, res) => {
	try {
		const { id } = req.params
		const updateData = req.body

		const updatedUser = await User.findByIdAndUpdate(id, updateData, {
			new: true,
		})
		if (updatedUser) {
			res.send({
				status: true,
				message: 'User updated successfully',
				user: updatedUser,
			})
		} else {
			console.log('User not found')
			res.send({ status: false, message: 'User not found' })
		}
	} catch (error) {
		console.log('Error updating user:', error)
		res.send({ status: false, message: 'Error updating user' })
	}
}

export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params

		const deletedUser = await User.findByIdAndDelete(id)
		if (deletedUser) {
			res.send({ status: true, message: 'User deleted successfully' })
		} else {
			res.send({ status: false, message: 'User not found' })
		}
	} catch (error) {
		console.log('Error deleting user:', error)
		res.send({ status: false, message: 'Error deleting user' })
	}
}
