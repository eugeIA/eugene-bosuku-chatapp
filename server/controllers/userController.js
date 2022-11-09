
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jwt-simple') 
const config = require('../config/jwt')


module.exports.login = async (request, response, next) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username });
    if (!user){return response.json({ msg: "Incorrect Username or Password", status: false });}
    else{
      const payload={
        id:user.id,
        name:user.username,
        expire:Date.now() + 1000*60*60*24
      }
      const token=jwt.encode(payload,config.jwtSecret);
  
      bcrypt.compare(password, user.password)
      .then((valid)=>{
       if(!valid){
        console.log('invqlid')
        response.status(401).json("invalid password or username");
       } 
       else{
        console.log(user);
         delete user.password
         response.json({
               status:true,
               user,
               token:`Bearer ${token}`
             })
       }
      })
    } 
    
   
    // if (!isPasswordValid)
    //   return res.json({ msg: "Incorrect Username or Password", status: false });
    // delete user.password;
    // return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
