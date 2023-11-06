console.log('buradayim')
const searchButton = document.querySelector('.searchButton')
const searchText = document.querySelector('.searchText')
console.log(searchText)
const getBooks = _ => {
    console.log(searchText.value)
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
                //eger kullanıcı giris yapıp token basarili bir sekilde olustrulmussa gelen kitaplara favorilere ekleme ve ödunc alma butonları eklenmeli 
                //ve o butonlara tiklayınca veritabanına eklenmeli
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
document.addEventListener('DOMContentLoaded',getBooks)