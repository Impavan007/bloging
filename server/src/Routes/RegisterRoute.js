import express from 'express'
import { Signin, googleController, register, veriFyEmail } from '../Controller/AuthController.js';


const Authrouter  = express.Router();

Authrouter.post('/signup',register);
Authrouter.post("/signIn",Signin);
Authrouter.get("/:id/verify/:token",veriFyEmail)
Authrouter.post("/google",googleController)


export default Authrouter;