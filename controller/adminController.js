//{layout : './adminLayout'}
//middleware kullanılmalı
const adminLogin = (req , res) => {
}

const adminPage = (req , res) => {
res.render('./adminPages/admin')
}

module.exports = {
    adminLogin,
    adminPage,

}