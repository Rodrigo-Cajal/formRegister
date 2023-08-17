const registerForm = document.getElementById('register-form');
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const phoneInput = document.getElementById('phone');

//Nos traemos los usuarios del localStorage
const users = JSON.parse(localStorage.getItem('users')) || [];


//Funcion para guardar los usuarios en el localStorage
const saveToLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users));
}

//Funcion para chequear si el campo esta vacio
const isEmpty = (input) => {
    return input.value.trim().length === 0;
}

//Funcion para determinar si el largo del value del input esta entre un minimo y un maximo de caracteres
const isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length < max;
}

//Funcion para validar una direccion de email con expresion regular
const isEmailValid = (input) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(input.value.trim());
}

//Funcion para chequear si el email ya esta registrado
const isExistingMail = (input) => {
    return users.some((user) => user.email === input.value.trim());
}

//Funcion para validar una contraseña con expresion regular
const isPassSecure = (input) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(input.value.trim());
}

//Funcion para validar el telefono con expresion regular
const isValidPhone = (input) => {
    const re = /^\d{10}$/;
    return re.test(input.value.trim());
}

//Funcion para mostrar un error al validar un input
const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector('small');
    error.style.display = 'block';
    error.textContent = message;
}

//Funcion para mostrar un mensaje de exito al validar un input
const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small');
    error.textContent = '';
}

//Funcion para validar un input de tipo texto
const checkTextInput = (input) => {
    let valid = false;
    const minCharacters = 3;
    const maxCharacters = 25;

    if (isEmpty(input)) {
        showError(input, 'Este campo es obligatorio');
        return;
    }

    if (!isBetween(input, minCharacters, maxCharacters)) {
        showError(input, `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`);
        return;
    }
    showSuccess(input);
    valid = true;
    return valid;
}

//Funcion para validar un input de tipo email
const checkEmail = (input) => {
    let valid = false;
    if (isEmpty(input)) {
        showError(input, 'Este campo es obligatorio');
        return;
    }

    if (!isEmailValid(input)) {
        showError(input, 'El email no es valido');
        return;
    }

    if (isExistingMail(input)) {
        showError(input, 'El email ya esta registrado');
        return;
    }

    showSuccess(input);
    valid = true;
    return valid;
}

//Funcion para validar el input de la contraseña
const checkPassword = (input) => {
    let valid = false;
    if (isEmpty(input)) {
        showError(input, 'Este campo es obligatorio');
        return;
    }

    if (!isPassSecure(input)) {
        showError(input, 'La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero');
        return;
    }

    showSuccess(input);
    valid = true;
    return valid;
}

//Funcion para validar el input del telefono
const checkPhone = (input) => {
    let valid = false;
    if (isEmpty(input)) {
        showError(input, 'Este campo es obligatorio');
        return;
    }

    if (!isValidPhone(input)) {
        showError(input, 'El telefono debe tener 10 digitos');
        return;
    }

    showSuccess(input);
    valid = true;
    return valid;
}

//Funcion para validar el formulario
const validateForm = (e) => {
    e.preventDefault();
    let validName = checkTextInput(nameInput);
    let validLastName = checkTextInput(lastNameInput);
    let validEmail = checkEmail(emailInput);
    let validPass = checkPassword(passInput);
    let validPhone = checkPhone(phoneInput);

    if (validName && validLastName && validEmail && validPass && validPhone) {
        const user = {
            name: nameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passInput.value.trim(),
            phone: phoneInput.value.trim(),
        }
        users.push(user);
        saveToLocalStorage();
        registerForm.reset();
        nameInput.focus();
        alert('Usuario registrado con exito');
    }
}





//Funcion iniciadora
const init = () => {
    registerForm.addEventListener('submit', validateForm);
    nameInput.addEventListener('input', () => checkTextInput(nameInput));
    lastNameInput.addEventListener('input', () => checkTextInput(lastNameInput));
    emailInput.addEventListener('input', () => checkEmail(emailInput));
    passInput.addEventListener('input', () => checkPassword(passInput));
    phoneInput.addEventListener('input', () => checkPhone(phoneInput));
}

init();

