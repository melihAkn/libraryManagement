const searchButton = document.querySelector('.searchButton')
const searchText = document.querySelector('.searchText')
let token
async function getCookie() {

    await fetch('/getCookie')
    .then(response => response.json())
    .then(data => {
        token = data.token
    })
    .catch(e => console.log(e))
}
//eger token gecerliyse nav barda kayıt ol ve giris yap navigasyonları kaldırılmalı ve hesabım ve cıkıs yap navigasyonları eklenmeli eğer çıkış yaparsa tam tersi
const getBooks = _ => {
    
    const getBooksURL = `/getBooks/${searchText.value.toString()}`
    fetch(getBooksURL)
    .then(response => response.json())
    .then(bookData => {
        console.log(bookData)
        const cardContainer = document.querySelector(".card-container")
        cardContainer.textContent = ""
        cardContainer.innerHTML = ""
            bookData.forEach(bookArray => {
                const card = document.createElement("div");
                card.classList.add("card")
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${bookArray.name}</h5>
                        <p class="card-text">Yayinci: ${bookArray.publisher}</p>
                        <p class="card-text">Yazar: ${bookArray.author}</p>
                        <p class="card-text">Stok: ${bookArray.stock}</p>
                        <p class="card-text">Yayinlanma tarihi: ${bookArray.publicationDate}</p>
                        <p class="card-text">Sayfa sayisi: ${bookArray.pageCount}</p>
                        <p class="card-text">barkod no: ${bookArray.ISBN}</p>
                        <p class="card-text">dil: ${bookArray.language}</p>
                        <p class="card-text">kategori: ${bookArray.genre}</p>
                        <p class="card-text">kitap aciklamasi: ${bookArray.description}</p>
                    </div>
                `
                console.log(token)
                if(typeof token !== 'undefined'){
                    const editButton = document.createElement("button")
                    editButton.id = "addFavorite"
                    editButton.textContent = "addFavorite"
                    editButton.addEventListener('click', _ => {console.log("tiklandi")})
                    const borrowButton = document.createElement('button')
                    borrowButton.id = "borrow"
                    borrowButton.textContent = "borrow"
                    borrowButton.addEventListener('click', _ => {console.log("tiklandi")})
                    card.append(editButton,borrowButton)

                }               
                //eger kullanıcı giris yapıp token basarili bir sekilde olustrulmussa gelen kitaplara favorilere ekleme ve ödunc alma butonları eklenmeli 
                //ve o butonlara tiklayınca veritabanına eklenmeli
                //yontem 1 butonlari veriyi cekerken ekleyip gorunurlugu hidden yapmak
                //yontem 2 kartlar geldikten sonra if ile token varsa ve geçerliyse butonları eklemek
                /*
                if(token){

                }
                */
                cardContainer.appendChild(card)
        });  






    })
    .catch(e => console.log(e))
}






searchButton.addEventListener('click',getBooks)
document.addEventListener('DOMContentLoaded',async function() {
    await getCookie()
    getBooks()
    
})