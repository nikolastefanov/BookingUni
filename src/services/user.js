
const User = require('../models/User');


async function createUser(uername,hashedPassword){
    const user=new User({
        username,
        hashedPassword
    });

    await user.save();
    
    return user;
}

async function getUserByUsername(username){

    //const user=await User.findOne({username:{$regex:username,$options:'i'}});

    const pattern=new RegExp(`^${username}$`,'i');

    const user=await User.findOne({username:{$regex:pattern}});

    return user;
}

module.exports={
    createUser,
    getUserByUsername
};