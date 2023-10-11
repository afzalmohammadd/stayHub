import express from 'express'
import * as usercontroller from '../Controllers/usercontroller/auth'

const router = express.Router();

router.post("/Register", usercontroller.Register);
router.post("/Login", usercontroller.Login);

export default router;