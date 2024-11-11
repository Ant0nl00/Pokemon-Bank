// balance.js
document.getElementById("balanceForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const accountNumberInput = document.getElementById("accountNumber").value;
    const storedAccountNumber = localStorage.getItem("accountNumber");

    // Validaciones con Validate.js
    const constraints = {
        accountNumberInput: {
            presence: { allowEmpty: false, message: "no puede estar vacío" },
            length: {
                is: storedAccountNumber.length,
                message: `debe tener exactamente ${storedAccountNumber.length} caracteres`
            }
        }
    };

    const formValues = { accountNumberInput };
    const errors = validate(formValues, constraints);

    if (errors) {
        Swal.fire("Error", errors.accountNumberInput.join(", "), "error");
    } else {
        // Comparación manual del número de cuenta
        if (accountNumberInput === storedAccountNumber) {
            const balance = parseFloat(localStorage.getItem("balance"));
            Swal.fire("Consulta de Saldo", `Su saldo actual es: $${balance.toFixed(2)}`, "info");
        } else {
            Swal.fire("Error", "Número de cuenta incorrecto.", "error");
        }
    }
});
