const contactForm = document.getElementById('contactInfos')
async function sendContactInfos(){
    const contactFormData = new FormData(contactForm);
    
    const contactFormDataJSON = {
        name: contactFormData.get('nameAndSurname'),
        contactAddress: contactFormData.get('contactAddress'),
        message: contactFormData.get('message')
    };
    
   await fetch('/contact', {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: contactFormDataJSON
    })
    .then(data => {
        alert(data)
        // Handle success response
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error
    });
}
 
contactForm.addEventListener('submit',sendContactInfos)


