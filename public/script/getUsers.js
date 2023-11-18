let token
let isTokenValid

async function getToken() {
       await fetch('/admin/getCookie')
        .then(response => response.json())
        .then(data => {
            token = data.token
        })
        .catch(e => {
            console.log(e)
        })
  
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
        console.log(data)
        if(data == true){
            isTokenValid = data
        }else{
            window.location.href = '/admin/Login'
        }
    })
    .catch(e => console.log(e))

}

function getUsers(){
    if(isTokenValid){

        fetch('/admin/users',{
            method : "get",
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(userData =>{ 
            console.log(userData)
            const cardContainer = document.querySelector(".card-container")
            cardContainer.textContent = ""
            cardContainer.innerHTML = ""
            console.log(cardContainer)
            userData.forEach(userArray => {
                const card = document.createElement("div");
                card.classList.add("card")
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${userArray.name +" "+ userArray.surname}</h5>
                        <p class="card-text">username: ${userArray.username}</p>
                        <p class="card-text">email: ${userArray.email}</p>
                        <p class="card-text">phone Number: ${userArray.phoneNumber}</p>
                  
                    </div>
                `
 
                cardContainer.appendChild(card);
            })
        
        })
        .catch(e => {
                console.log(e)
            });



    }
}





document.addEventListener('DOMContentLoaded',async function(){
    await getToken()
    await validToken(token)
    getUsers()
})