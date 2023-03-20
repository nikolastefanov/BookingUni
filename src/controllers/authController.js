const router=require('express').Router();
const {body,validationResult}=require('express-validator');
const {isGuest}=require('../middlewares/guards');

router.get('/register',isGuest(),(req,res)=>{
    res.render('register');
});

router.post('/register',isGuest(),
body('username').isLength({min:3}).withMessage('Length>3'),
body('rePass').custom((value,{req})=>{
    if(value!=req.body.password){
        throw new Error('Password dont\'t match');
    }
    return true;
}),
async (req,res)=>{
    console.log('authController.js 1',req.body);
    const {errors}=validationResult(req);
    console.log(errors);

    try {
        if(errors.length>0){
            throw new Error('Validation error');
        }
        console.log('authController.js 3');
        console.log('req.body.username',req.body.username);
        console.log('req.body.password',req.body.password);
        await req.auth.register(req.body.username,req.body.password);
        console.log('authController.js 4');
    } catch (err) {

        console.log('authController.js 2',err.message);
        
        const ctx={
            errors,
            userData:{
                username:req.body.username
            }
        }
        res.render('register',ctx);
    }
}
);


router.get('/login',isGuest(),(req,res)=>{
    res.render('login');
});

router.post('/login',isGuest(),async (req,res)=>{
    try {

        await req.auth.login(req.body.username,req.body.password);

        res.redirect('/');

    } catch (err) {

        console.log(err.message);

        const ctx={
            errors:[err.message],
            userData:{
                username: req.body.username
            }
        };

        
        res.render('login',ctx)
    }
})


router.get('/logout',(req,res)=>{

   req.auth.logout();
   res.redirect('/');
})

module.exports=router;