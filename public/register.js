const registerForm = document.querySelector('#register-form')

// done, just add a redirect to login or main page later

const register = body => axios.post('http://localhost:8765/register', body)
    .then(res => {
        const data = res.data
        console.log(data)
        document.querySelector('p').textContent = data
        alert('Registration complete')
    }).catch(err => {
        alert(`Registration failed.`)
    })

const registerFormHandler = (evt) => {
    evt.preventDefault()

    let username = document.querySelector('#reg_username')
    let password = document.querySelector('#reg_password')
    let passwordCheck = document.querySelector('#repeat_password')
    //console.log(updateNumber.value)
    if(username.length === 0) {
        alert('Username can not be empty')
    } else if(password.length === 0) {
        alert(`password can't be empty`)
    } else if(password.value !== passwordCheck.value) {
        alert(`Your password must match the password entered into 're-enter password'`)
    } else {
        let bodyObj = {
            username: username.value,
            password: password.value
        }
        console.log(bodyObj)
        //loginForm.classList.add('hidden')
        //console.log(bodyObj.updateNumber)
        register(bodyObj)
    }

}

registerForm.addEventListener('submit', registerFormHandler)