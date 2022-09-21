import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from "jsonwebtoken"

import { createError } from "../error.js"
export const signup=async(req,res,next)=>
{
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
        const savedUser=await newUser.save();
        res.status(200).json(savedUser);
      } catch (err) {
        next(err);
      }
}
export const signin=async(req,res,next)=>
{
    try {
      const user = await User.findOne({ name: req.body.name });
      if (!user) return next(createError(404, "User not found!"));
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isCorrect) return next(createError(401, "Wrong Credentials!"));
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      const { password, ...others } = user._doc;
      res.cookie("access_token", token, {httpOnly: true
        })
        .status(200)
        .json(others);

}
catch(err)
{
next(err)
}
}