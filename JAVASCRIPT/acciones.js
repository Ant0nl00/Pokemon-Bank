// acciones.js
document.addEventListener("DOMContentLoaded", function () {
    // Cargar información del usuario desde LocalStorage
    const username = localStorage.getItem("username") || "[MAESTRO POKEMON]";
    const accountNumber = localStorage.getItem("accountNumber") || "1234-5678-90";
    
    document.querySelector("h1").innerText = `Bienvenido, ${username}`;
    document.querySelector("p").innerText = `Número de Cuenta: ${accountNumber}`;
});
