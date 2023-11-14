const searchText = document.querySelector('.searchText')
const searchButton = document.getElementById('searchButton')
let token

async function getToken() {
    try {
        await fetch('/getCookie')
        .then(response => response.json())
        .then(data => {
            token = data.token
        })
        .catch(e => {
            console.log(e)
        })
    } catch (error) {
        console.log(error)
    }
}
const getFavoritedBooks = _ => {
    const getBooksURL = `/user/getFavoritedBooks/${searchText.value.toString()}`
    fetch(getBooksURL,{
        method : 'get',
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(bookData => {
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
                        <button type = "button" class = "removeFavorite">remove favorite </button>
                    </div>
                `
             
                cardContainer.appendChild(card)
        });  
    })
    .then( _ => {
        const removeFavoriteButton = document.querySelectorAll('.removeFavorite')
        removeFavoriteButton.forEach(e => {
            e.addEventListener('click',function removeFavorite() {
                //fetch ile favorilerden kitap silme
                console.log('silinecek')
            })
        })
      
    })
    .catch(e => console.log(e))
}

async function logout() {
    const navigators = document.querySelectorAll('.navigators')
    navigators[0].children[5].addEventListener('click',function(){
        fetch('/removeToken',{
       method : 'get',
       headers : {
        authorization : `Bearer ${token}`
       }
    })
    .then( _ => {
        window.location.href = "/"
    })
    })
}
searchButton.addEventListener('click',getFavoritedBooks)
document.addEventListener('DOMContentLoaded',async function(){
    await getToken()
    getFavoritedBooks()
   await logout()
    
})
