const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userService=require('../services/user');
const {TOKEN_SECRET,COOKIE_NAME}=require('../config');


    //TODO parse jwt
 module.expors=(req,res,next)=>{
        
        //attach functions to contex

    if(parseToken(req,res)){

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
}



async function register(username,password){

    // TODO adapt parameter to project requirents
    //TODO extra validations

    const existing=await userService.getUserByUsername(username);

    if(existing){
        throw new Error('User is taken!');
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user=await userService.createUser(username,hashedPassword);

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


function parseToken(req,res){

    const token=req.cookies[COOKIE_NAME];
  if(token){
    try {    

            const userData=jwt.verify(token,TOKEN_SECRET);

            req.user=userData;

            res.locals.user = userData;
        
    } catch (err) {
        
        console.log(err);

        res.clearCookie(COOKIE_NAME);

        res.redirect('/auth/login');

        return false;
    }
  }
    return true;
}