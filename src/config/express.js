const express = require('express');
const cookieParser = require('cookie-parser')
const{ engine }=require('express-handlebars');
const {authMiddleware} = require('../middlewares/auth')

module.exports=(app)=>{

 
    app.engine('.hbs', engine({extname:'.hbs'}));
    app.set('view engine', '.hbs');
    app.set('views', './views');
    

    
    app.use('/static',express.static('static'));
    app.use(express.urlencoded({extended:true}));
    app.use(cookieParser());
    app.use(authMiddleware());

    //TODO add storage and authmiddleware


    //TO DO loger za proba na "parseToken" page23

}