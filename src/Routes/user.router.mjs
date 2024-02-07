import express from "express";
import {getUserById, getUsers, postUser, postLogin, putUser} from '../Controllers/user-controller.mjs';

const userRouter = express.Router();



userRouter.route('/')
// list users
.get(getUsers)
// user registration
.post(postUser);
// get info of a user
userRouter.route('/:id')
.get(getUserById)
// update user
.put(putUser);

// user login
userRouter.post('/login', postLogin);



export default userRouter;
