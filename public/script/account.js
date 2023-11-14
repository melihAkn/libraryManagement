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
             return isTokenValid
        }else{
            isTokenValid = false
           return isTokenValid
        }
    })
    .catch(e => console.log(e))
}


document.addEventListener('DOMContentLoaded',async function() {
    await getToken()
  
    
})