import express from 'express'
import * as admincontroller from '../Controllers/admincontroller/auth'

const router = express.Router()

router.post("/adminLogin", admincontroller.adminLogin);
router.post("/adminReg", admincontroller.adminReg);


export default router;