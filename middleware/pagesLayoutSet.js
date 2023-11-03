  function indexPageLayout(req, res, next) {
    res.locals.layout = 'indexLayout'
    next()
  }
  function adminPageLayout(req, res, next) {
    res.locals.layout = 'adminLayout'
    next()
  }
  function userPageLayout(req, res, next) {
    res.locals.layout = 'userLayout'
    next()
  }
  module.exports = {
    indexPageLayout,
    adminPageLayout,
    userPageLayout
}

