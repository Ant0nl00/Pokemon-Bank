// login.js
document.getElementById("loginForm").addEventListener("submit", validateLogin);

function validateLogin(event) {
    event.preventDefault();
    const pin = document.getElementById("pin").value;
    const userPin = "1234"; // PIN de usuario

    if (pin === userPin) {
        // Guardar datos en LocalStorage
        localStorage.setItem("username", "Ash Ketchum");
        localStorage.setItem("accountNumber", "0987654321");
        localStorage.setItem("balance", "500.00"); // Saldo inicial
        window.location.href = "acciones.html"; // Redirige a la pantalla de acciones
    } else {
        Swal.fire("Error", "PIN incorrecto. Intente nuevamente.", "error");
    }
}
