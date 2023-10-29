const jwt = require('jsonwebtoken')

const isAdmin = (token) => {
    const tokenControl = jwt.verify(token)
    if(tokenControl.isAdmin == true){

    }


}


module.exports = isAdmin