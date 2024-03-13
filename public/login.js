const loginForm = document.querySelector('#login-form')

const login = body => axios.post(`http://localhost:8765/login`, body)
    .then(res => { 
        const data = res.data
        console.log(data)

        document.querySelector('p').textContent = data
        toggle()
        alert('Login Successful')
}).catch(err => {
    alert('Login failed. Check your credentials')
})

const loginFormHandler = (e) => {
    e.preventDefault()

    let username = document.querySelector('#username')
    let password = document.querySelector('#password')

    let bodyObj = {
        username: username.value,
        password: password.value
    }
    console.log(bodyObj)
    login(bodyObj)

}

const toggle = () => {
    document.getElementById("login-form").style.display = "none" // Hide register-form after submitting
    document.querySelector('p').style.display = "block"
    document.querySelector('#next').style.display = "block"
    document.querySelector('#register').style.display = "none"
}

loginForm.addEventListener('submit', loginFormHandler)