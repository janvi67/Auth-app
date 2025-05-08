import express from "express";
import { signup,login ,customerSignup} from "../controller/auth.controller.js";

const router = express.Router();
router.post("/register/admin", signup);
router.post("/register/customer",customerSignup);
router.post("/login",login)


export default router;