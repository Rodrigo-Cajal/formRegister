const logoutBtn = document.getElementById("logout-message");
const userNamen = document.getElementById("user-name");

//Nos traemos el usuario activo del SessionStorage
const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));

//Funcion para mostrar el nombre y apellido del usuario activo
const showUserName = () => {
    userNamen.textContent = `${activeUser.name} ${activeUser.lastName}`;
    };

//Funcion para cerrar sesion
const logout = () => {
    if(window.confirm("¿Estas seguro que deseas cerrar sesion?")){
    sessionStorage.removeItem("activeUser");
    window.location.href = "./index.html";
}
};

const init = () => {
    showUserName();
    logoutBtn.addEventListener("click", logout);
};

init();