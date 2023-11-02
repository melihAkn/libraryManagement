//{layout : './adminLayout'}
//middleware kullanılmalı
const adminLogin = (req , res) => {
}

const adminPage = (req , res) => {
res.render('./adminPages/admin',{layout : './adminLayout'})
}

module.exports = {
    adminLogin,
    adminPage,

}