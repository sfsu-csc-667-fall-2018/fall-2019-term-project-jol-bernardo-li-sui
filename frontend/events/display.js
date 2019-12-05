let loginSignupButton = document.querySelector('.button__login-signup')

let showModal = () => {
    loginSignupButton.addEventListener('click', () => {
        let modal = document.querySelector('.modal')
        modal.style.display = "flex"
    })
}

let showLogin = () => {
    let loginButton = document.querySelector('.modal__form--tab-login')
    let signupButton = document.querySelector('.modal__form--tab-signup')

    loginButton.addEventListener('click', () => {
        loginButton.classList.add('selected')
        signupButton.classList.remove('selected')

        let loginForm = document.querySelector('.modal__form--login')
        let signupForm = document.querySelector('.modal__form--signup')

        loginForm.style.display = "flex"
        signupForm.style.display = "none"
    })
}

let showSignup = () => {
    let loginButton = document.querySelector('.modal__form--tab-login')
    let signupButton = document.querySelector('.modal__form--tab-signup')

    signupButton.addEventListener('click', () => {
        signupButton.classList.add('selected')
        loginButton.classList.remove('selected')

        let loginForm = document.querySelector('.modal__form--login')
        let signupForm = document.querySelector('.modal__form--signup')

        loginForm.style.display = "none"
        signupForm.style.display = "flex"
    })
}

if(loginSignupButton !== null){
    showModal()
    showLogin()
    showSignup()
}