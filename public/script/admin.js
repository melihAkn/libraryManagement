let token
let isTokenValid
async function getToken() {
    await fetch('/admin/getCookie')
    .then(response => response.json())
    .then(data => {
        if(data.tokenFound == false ){
            window.location.href = '/admin/Login'
        }
        token = data.token
    })
    .catch(e => console.log(e))
}

async function validToken(token){
    await fetch('/admin/validToken',{
        method : "GET",
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data == true){
            isTokenValid = data
        }else{
            window.location.href = '/admin/Login'
        }
    })
    .catch(e => console.log(e))

}
const searchButton = document.querySelector('.searchButton')
const searchText = document.querySelector('.searchText')

let adminButtonDeleteURL = '/userAddFavoriteAndBorrow'
let adminButtonUpdateURL = '/userAddFavoriteAndBorrow'

const getBooks = _ => {
    
    const getBooksURL = `admin/getBooks/${searchText.value.toString()}`
    fetch(getBooksURL)
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
                    </div>
                `
                if(isTokenValid){

                    //this function belongs here or send the card element then doesnt belongs here 
                    const deleteBook = (buttonName) => {
                        const bookData = card.childNodes[1].childNodes
                        const cardData = {
                            bookBarcodNo : bookData[13].textContent.replace('barkod no: ',''),
                        }
                        fetch('/admin/'+buttonName+`/${cardData.bookBarcodNo}`,{
                            method : 'DELETE',
                            headers : {
                                authorization : `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        })
                        .then(response => response.json())
                        .then(data => {
                            alert(data.message)
                            getBooks()
                        })
                        .catch(e => {
                            console.log(e)
                        })
                    }
                    const updateBook = (buttonName) => {

                        
                    }
                    const updateButton = document.createElement("button")
                    updateButton.id = "updateBook"
                    updateButton.textContent = "update"
                    updateButton.addEventListener('click', _ => {
                        updateBook(updateButton.id)
                    })
                    const deleteButton = document.createElement('button')
                    deleteButton.id = "deleteBook"
                    deleteButton.textContent = "delete"
                    deleteButton.addEventListener('click', _ => {
                        deleteBook(deleteButton.id)

                    })
                    card.append(updateButton,deleteButton)

                }               
            
                cardContainer.appendChild(card)
        });  
    })
    .catch(e => console.log(e))
}




document.addEventListener('DOMContentLoaded',async function(){
    await getToken()
    await validToken(token)
    await getBooks()
})