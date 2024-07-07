const express = require('express');
const { isUser } = require('../../middlewares/isUser');
const userRouter = express.Router();

userRouter.get('/', isUser, async (req, res) => {
  const user = req.user
  return res.status(200).json(user);
})


module.exports = {userRouter}