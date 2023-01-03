import express from "express";

import { login, signup } from '../controllers/auth.js'
import { getAllusers,updateProfile } from '../controllers/users.js'
import auth from '../middelwares/auth.js'


const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)

router.get('/getAllusers', getAllusers)
router.patch('/update/:id',auth,updateProfile)
export default router
