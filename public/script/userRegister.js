const responseMessage = document.querySelector('.responseMessage')
const registerForm = document.getElementById('registerForm')
registerForm.addEventListener('submit',function(e) {
    const registerFormData = new FormData(registerForm)
    console.log(registerFormData)
    const formData = {
        name :registerFormData.get('name'),
        surname :registerFormData.get('surname'),
        email:registerFormData.get('email'),
        username:registerFormData.get('username'),
        password:registerFormData.get('password')
    }
    const registerURL = '/userRegister'
    fetch(registerURL,{
        method : 'POST',
        headers: {
             "Content-Type": "multipart/form-data",// <---- Had to comment / remove this line
          },
        body : formData

    })
    .then(e => {
        
        console.log(e)
        
    })
    .catch(e => console.log(e))
    responseMessage.value = e.message

})
