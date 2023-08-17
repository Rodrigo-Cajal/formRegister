const loginForm = document.getElementById('login--form');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const errorMessage = document.getElementById('form__error');

//Nos traemos los usuarios del localStorage
const users = JSON.parse(localStorage.getItem('users')) || [];

//Funcion para guardar usuario en el SessionStorage
const saveToSessionStorage = (user) => {
    sessionStorage.setItem('activeUser', JSON.stringify(user));
};

//Funcion para chequear si el campo esta vacio (input)
const isEmpty = (input) => {
    return !input.value.trim().length;
};

//Funcion para chequear si el mail ya existe en el array de usuarios
const isExistingEmail = (input) => {
    return users.some((user) => user.email === input.value.trim());
};

//Funcion para mostrar el error al validar el formulario
const showError = (message) => {
    errorMessage.textContent = message;
};

//Funcion para comparar si las pass ingresada coincide con la registrada para ese email
const isMatchingPass = (input) => {
    const user = getUser();
    return user.password === input.value.trim();
};


//Funcion para recoger al usuario en caso de que ya exista
const getUser = () => {
    return users.find((user) => user.email === emailInput.value.trim());
};


//Funcion para validar el formulario de login
const isValidAccount = () => {
    let valid = false;
    if (isEmpty(emailInput)) {
        showError('Por favor, ingrese su email');
        return;
    }
    if (!isExistingEmail(emailInput)) {
        showError('El email ingresado es incorrecto');
        return;
    }
    if (isEmpty(passInput)) {
        showError('Por favor, ingrese su contraseña');
        return;
    }
    if (!isMatchingPass(passInput)) {
        showError('La contraseña ingresada es incorrecta');
        loginForm.reset();
        return;
    }
    alert('Bienvenido!');
    valid = true;
    errorMessage.textContent = '';

    return valid;
};

//Funcion para loguear al usuario
const login = (e) => {
    e.preventDefault();
    if (isValidAccount()) {
        const user = getUser();
        saveToSessionStorage(user);
        window.location.href = './home.html';
    }
}

const init = () => {
    loginForm.addEventListener('submit', login);
};

init();
