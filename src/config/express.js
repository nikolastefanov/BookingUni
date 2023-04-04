const express = require('express');
const cookieParser = require('cookie-parser')
const{ engine }=require('express-handlebars');
const storageMiddleware=require('../middlewares/storage');
const authMiddleware = require('../middlewares/auth')

module.exports = (app) => {

    app.engine('.hbs', engine({extname:'.hbs'}));
    app.set('view engine', '.hbs');
    app.set('views', './views');

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(authMiddleware());
    app.use(storageMiddleware());

    // logger
    app.use((req, res, next) => {
        if (!req.url.includes('favicon')) {
            console.log('>>>', req.method, req.url);

            if (req.user) {
                console.log('Known user', req.user.username);
            }
        }
        next();
    })
}