import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	hobby: {
		type: [String],
		required: true,
	},
	skills: {
		type: [String],
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
})

const User = mongoose.model('User', userSchema)
export default User
