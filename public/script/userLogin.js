const loginForm = document.getElementById('')

loginForm.addEventListener('submit',function(e){
    const backendURL = "/userLogin"
    const LoginFormData = new formData(loginForm)
    fetch(backendURL,{
        method : "POST",
        body :  LoginFormData
    })
    .then(response => console.log(response))
    .catch(e => console.log(e))



})


