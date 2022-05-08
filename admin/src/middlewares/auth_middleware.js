const loggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash('error',['Please sign in first']);
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
const isSuperAdmin = function(req,res,next){
    if(req.user.level === 10){
        return next();
    }
    else{
        req.flash('error',['You are not authorized to access this page']);
        res.redirect('/')
    }
}
module.exports = {loggedIn,notLoggedIn,isSuperAdmin}