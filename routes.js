import express from 'express'
import {
	register,
	login,
	updateUser,
	deleteUser,
	getAllUsers,
} from './controllers.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/all-users', getAllUsers)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

export default router
