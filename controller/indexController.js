const index = (req,res) => {
    res.render('./indexPages/index')
}
const about = (req,res) => {
    res.render('./indexPages/about')
}
const contact = (req,res) => {
    res.render('./indexPages/contact')
}
const searchBooks = (req,res) => {
    res.render('./indexPages/searchBooks')
}

module.exports = {
    index,
    about,
    contact,
    searchBooks
}