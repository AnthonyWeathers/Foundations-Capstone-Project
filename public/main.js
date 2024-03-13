const fortuneForm = document.querySelector('#fortune-form')
const getFortuneBtn = document.querySelector('#get-fortunes')
const link = document.querySelector('a')

const updateFortuneSet = body => axios.put(`http://localhost:8765/fortunes`, body)
    .then(res => {
        alert(res.data)
    })

const fortuneFormHandler = (e) => {
    e.preventDefault()

    let updateNumber = document.querySelector('#number')

    let bodyObj = {
        updateNumber: updateNumber.value
    }
    updateFortuneSet(bodyObj)

    updateNumber.value = ''
}

const getFortunesHandler = () => {
    axios.get(`http://localhost:8765/fortunes`)
    .then(res => {
        const data = res.data;

        if(data.length === 2) {
            twoFortunes([data[0][0].fortune, data[1][0].fortune])
        } else if(data.length === 3) {
            threeFortunes([data[0][0].fortune, data[1][0].fortune, data[2][0].fortune])
        }
        else {
            const p1 = document.getElementById('fortune1')
            p1.textContent = data[0][0].fortune
            const p2 = document.getElementById('fortune2')
            p2.textContent = ''
            const p3 = document.getElementById('fortune3')
            p3.textContent = ''
        }
    })
}

const twoFortunes = fortunes => {
    const p1 = document.getElementById('fortune1')
    p1.textContent = fortunes[0]
    const p2 = document.getElementById('fortune2')
    p2.textContent = fortunes[1]
    const p3 = document.getElementById('fortune3')
    p3.textContent = ''
    return
}

const threeFortunes = fortunes => {
    const p1 = document.getElementById('fortune1')
    p1.textContent = fortunes[0]
    const p2 = document.getElementById('fortune2')
    p2.textContent = fortunes[1]
    const p3 = document.getElementById('fortune3')
    p3.textContent = fortunes[2]
    return
}

const signOut = evt => {
    evt.preventDefault()
    
    axios.get(`http://localhost:8765/signout`)
    .then(res => {
        window.location.href = "./login.html"
    })
}

const getUser = () => {
    axios.get(`http://localhost:8765/user`)
    .then(res => {
        console.log(res.data[0].username)
        document.getElementById('logged-username').textContent = `username: ${res.data[0].username}`
        document.getElementById('logged-userID').textContent = `userID: ${res.data[0].user_id}`
    })
}

fortuneForm.addEventListener('submit', fortuneFormHandler)
getFortuneBtn.addEventListener('click', getFortunesHandler)
link.addEventListener('click', signOut)

getUser()