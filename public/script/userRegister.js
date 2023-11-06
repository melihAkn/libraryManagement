
const registerForm = document.getElementById('registerForm')
registerForm.addEventListener('submit',function(e) {
    e.preventDefault()

    const registerFormData = new FormData(registerForm)
    console.log(registerFormData)
    const registerURL = '/userRegister'
    fetch(registerURL,{
        method : "POST",
        body : registerFormData
    })
    .then(response => response.json())
    .then(e => {

    })
    .catch(e => console.log(e))


})
