// retiro.js
document.getElementById("withdrawForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const withdrawAmount = document.getElementById("withdrawAmount").value;
    let balance = parseFloat(localStorage.getItem("balance"));

    // Validaciones con Validate.js
    const constraints = {
        withdrawAmount: {
            presence: { allowEmpty: false, message: "no puede estar vacío" },
            numericality: {
                greaterThan: 0,
                lessThanOrEqualTo: balance,
                message: `debe ser un valor positivo y menor o igual al saldo disponible (${balance.toFixed(2)})`
            }
        }
    };

    const formValues = { withdrawAmount: parseFloat(withdrawAmount) };
    const errors = validate(formValues, constraints);

    if (errors) {
        Swal.fire("Error", errors.withdrawAmount.join(", "), "error");
    } else {
        balance -= parseFloat(withdrawAmount);
        localStorage.setItem("balance", balance.toFixed(2));

        // Guardar transacción en LocalStorage
        saveTransaction("Retiro", parseFloat(withdrawAmount));

        // Confirmación de retiro y generación de comprobante
        Swal.fire({
            title: "Retiro Exitoso",
            text: `Has retirado $${parseFloat(withdrawAmount).toFixed(2)}.`,
            icon: "success",
            confirmButtonText: "Generar Comprobante PDF"
        }).then(() => generatePDF("Retiro", parseFloat(withdrawAmount)));
    }
});

function saveTransaction(type, amount) {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push({
        type,
        amount,
        date: new Date().toLocaleString()
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function generatePDF(type, amount) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Comprobante de Transacción - Pokémon Bank", 10, 10);
    doc.text(`Tipo de Transacción: ${type}`, 10, 20);
    doc.text(`Monto: $${amount.toFixed(2)}`, 10, 30);
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 10, 40);
    doc.save("comprobante_transaccion.pdf");
}
 // Limpiar los campos del formulario
 document.querySelector("form").reset();