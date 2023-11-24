const searchButton = document.querySelector('.searchButton')
const searchText = document.querySelector('.searchText')
const pageButtonsDiv = document.getElementById('pagingButtons')
let token
let isTokenValid
let userButtonsURL = '/userAddFavoriteAndBorrow'

const indexHeaders = document.getElementById('indexNavBar')


async function getToken() {
    try {
        await fetch('/getCookie')
        .then(response => response.json())
        .then(data => {
            token = data.token
        })
    } catch (error) {
        console.log(error)
    }
}
async function tokenIsValid(token){
    await fetch('/validToken',{
        method : 'get',
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    .then(response => {
        if(response.status == 200){
            isTokenValid = true
            /*
             // remove login and register routes
            indexHeaders.childNodes[1].childNodes[9].remove();
            indexHeaders.childNodes[1].childNodes[10].remove();
            const logoutLi = document.createElement('li');
            logoutLi.innerHTML = '<a href="/logout">logout</a>';
            indexHeaders.childNodes[1].appendChild(logoutLi);
*/
             return isTokenValid
             
        }else{
            isTokenValid = false
           return isTokenValid
        }
        
    })
    .catch(e => console.log(e))
}
console.log(searchText.value)

const getBooks =async (countDocuments) => {
    
    const getBooksURL = `/getBooks/${countDocuments}/${searchText.value.toString()}`
  
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
                    const addFavoriteOrBorrwed = (buttonName) => {
                        const bookData = card.childNodes[1].childNodes
                        const cardData = {
                            bookName : bookData[1].textContent,
                            bookPublisher : bookData[3].textContent.replace('Yayinci: ',''),
                            bookAuthor : bookData[5].textContent.replace('Yazar: ',''),
                            bookStock : bookData[7].textContent.replace('Stok: ',''),
                            bookPublicationDate : bookData[9].textContent.replace('Yayinlanma tarihi: ',''),
                            bookPageCount : bookData[11].textContent.replace('Sayfa sayisi: ',''),
                            bookBarcodNo : bookData[13].textContent.replace('barkod no: ',''),
                            bookLanguage : bookData[15].textContent.replace('dil: ',''),
                            bookCategory : bookData[17].textContent.replace('kategori: ',''),
                            bookDescription : bookData[19].textContent.replace('kitap aciklamasi: ','')

                        }
                        fetch(userButtonsURL+'/'+buttonName,{
                            method : 'post',
                            headers : {
                                authorization : `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                            body : JSON.stringify(cardData)
                        })
                        .then(response => response.json())
                        .then(data => {
                            alert(data.message)
                        })
                        .catch(e => {
                            console.log(e)
                        })
                    }
                    const addButton = document.createElement("button")
                    addButton.id = "addFavorite"
                    addButton.textContent = "addFavorite"
                    addButton.addEventListener('click', _ => {
                        addFavoriteOrBorrwed(addButton.id)
                    })
                    const borrowButton = document.createElement('button')
                    borrowButton.id = "addBorrow"
                    borrowButton.textContent = "borrow"
                    borrowButton.addEventListener('click', _ => {
                        addFavoriteOrBorrwed(borrowButton.id)

                    })
                    card.append(addButton,borrowButton)

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

const  getCountDocuments =async _ => {
    fetch(`/countBooks`)
    .then(response => response.json())
    .then(data => {
        
     

        console.log(data.booksCount)
        const buttonCount = Math.floor((data.booksCount / 40) - 1)
        console.log(buttonCount)
        let pageNumber = 1
        for ( pageNumber; pageNumber <= buttonCount; pageNumber++) {
        
            const pagingButtons = document.createElement("button")
            pagingButtons.id = pageNumber
            pagingButtons.textContent = pageNumber
            pagingButtons.addEventListener('click', _ => {
                getBooks(pagingButtons.textContent * 40)
            })
            pageButtonsDiv.append(pagingButtons)
        }
        //burada gelen document sayısına gore buton oluşturmalıyız
    }).catch(e => console.log(e))
}


searchButton.addEventListener('click',getBooks)
document.addEventListener('DOMContentLoaded',async function() {
    
    getBooks(40)
    await getToken()
    tokenIsValid(token)
    
    
})