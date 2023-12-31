  function indexPageLayout(req, res, next) {
    res.locals.layout = 'indexLayout'
    if(req.cookies.token){
      res.locals.layout = 'userLoginIndex'
    }
    
    next()
  }
  function adminPageLayout(req, res, next) {
    res.locals.layout = 'adminLayout'
    next()
  }
  function userPageLayout(req, res, next) {
    res.locals.layout = 'indexLayout'
    if(req.cookies.token){
      res.locals.layout = 'userLoginIndex'
    }
    next()
  }
  module.exports = {
    indexPageLayout,
    adminPageLayout,
    userPageLayout
}

