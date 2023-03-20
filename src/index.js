const express=require('express');
const { PORT } = require('./config');
const databaseConfig=require('./config/database');
const expressConfig=require('./config/express');
const { startSession } = require('mongoose');
const routesCofing=require('./config/routes');

// za test const authMiddleware=require('./middlewares/auth');

start();

async function start(){

const app=express();

await databaseConfig(app);

expressConfig(app);

routesCofing(app);

app.get('/',(req,res)=>
res.send('It works! ????????????'));

app.listen(PORT, ()=>{

   //za test  testAuth();

console.log(`Application started at http://localhost:${PORT}`);

});

};

/*
za test

async function testAuth(){
      
    const reqMock={};
    const resMock={
        cookie(){'Set cookie',arguments
            console.log(arguments)}};

            //const nextMock()
    try{
        const auth=authMiddleware();

        auth(reqMock,resMock,nextMock);
        await reqMock.auth.register('Peter','123123');

        console.log(result);

        const user=await userService.getUserByUsername('peter');

        console.log(user);
    }catch(err){
        console.log('Error:',err.message);
    }
}
*/
