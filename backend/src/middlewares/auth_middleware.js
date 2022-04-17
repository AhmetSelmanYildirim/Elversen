const loggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash('error',['Lütfen önce giriş yapınız.']);
        res.redirect('/login')
    }
}
const notLoggedIn = function(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/')
    }
}
module.exports = {loggedIn,notLoggedIn}