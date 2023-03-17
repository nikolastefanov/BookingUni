const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userService=require('../services/user');
const {TOKEN_SECRET,COOKIE_NAME}=require('../config');

function init(){
    //TODO parse jwt
    return function(req,res,next){
        
        //attach functions to contex
        req.auth={

            async register(username,password){
                const token=await register(username,password);
                res.cookie(COOKIE_NAME,token);
            },

           async login(username,password){
               const token=await login(username,password);
               res.cookie(COOKIE_NAME,token)
           },

           logout(){
               res.clearCookie(COOKIE_NAME);
           }
        };
        
        next();
    };
};


async function register(username,password){

    // TODO adapt parameter to project requirents
    //TODO extra validations

    const existing=await userService.getUserByUsername(username);

    if(existing){
        throw new Error('User is taken!');
    }

    const user=await userService.createUser(username,password);

    return generateToken(user);
};


async function login(username,password){

const user=await userService.getUserByUsername(username);

if(!user){
    throw new Error('No such user');
}

const hasMatch=await bcrypt.compare(password,user.hashedPassword);

if(!hasMatch){
    throw new Error('Incorrect password!');
}

return generateToken(user);
};


function generateToken(userData){
    return jwt.sign({
        _id:userData._id,
        username:userData.usename
    },TOKEN_SECRET);
}