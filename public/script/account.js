let token
let isTokenValid
const userInfosUpdateButton = document.getElementById('updateUserInfos')
const userInfosForm = document.getElementById('userInfosForm')
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
    console.log(token)
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
function getUserInfos(){
    if(isTokenValid == true){
        fetch('/user/getUserInfos',{
            method : 'GET',
            headers: {
                authorization : `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            userInfosForm.elements['name'].value = data.name
            userInfosForm.elements['surname'].value = data.surname
            userInfosForm.elements['username'].value = data.userName
            userInfosForm.elements['email'].value = data.email
            userInfosForm.elements['phoneNumber'].value = data.phoneNumber
        })
        .catch(e => console.log(e))

    } else{
        alert('invalid token')
         setTimeout(async() => {
            await fetch('/removeToken',{
                method : 'get',
             })
            window.location.href = '/'
        }, 2000);
    }
}

function updateUserInfos(e) {
    e.preventDefault()
    const email = document.getElementById('email').value
    const username = document.getElementById('username').value
    const userUpdateFormData = new FormData(userInfosForm)
    userUpdateFormData.append('email',email)
    userUpdateFormData.append('username',username)
    const formData = {
        name : userUpdateFormData.get('name'),
        surname : userUpdateFormData.get('surname'),
        username : userUpdateFormData.get('username'),
        oldPassword : userUpdateFormData.get('oldPassword'),
        newPassword : userUpdateFormData.get('newPassword'),
        emailAdress : userUpdateFormData.get('email'),
        phoneNumber : userUpdateFormData.get('phoneNumber')
    }

    console.log(userUpdateFormData)
    fetch('/user/updateUserInfos',{
    method : 'PATCH',
    headers : {
        'Content-Type': 'application/json',
        authorization : `Bearer ${token}`
    },
    body : JSON.stringify(formData)
    })
    .then(data => {
        console.log(data)
        alert('success')
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    })
    .catch(e => console.log(e))
}
 

userInfosForm.addEventListener('submit',updateUserInfos)
document.addEventListener('DOMContentLoaded',async function() {
    await getToken()
    await tokenIsValid(token)
    getUserInfos()
  
    
})