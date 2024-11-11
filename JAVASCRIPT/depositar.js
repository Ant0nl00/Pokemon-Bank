// deposit.js
document.getElementById("depositForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const depositAmount = document.getElementById("depositAmount").value;

    // Validaciones con Validate.js
    const constraints = {
        depositAmount: {
            presence: { allowEmpty: false, message: "no puede estar vacío" },
            numericality: {
                greaterThan: 0,
                message: "debe ser un valor positivo"
            }
        }
    };

    const formValues = { depositAmount: parseFloat(depositAmount) };
    const errors = validate(formValues, constraints);

    if (errors) {
        Swal.fire("Error", errors.depositAmount.join(", "), "error");
    } else {
        let balance = parseFloat(localStorage.getItem("balance"));
        balance += parseFloat(depositAmount);
        localStorage.setItem("balance", balance.toFixed(2));

        // Guardar transacción en LocalStorage
        saveTransaction("Depósito", parseFloat(depositAmount));

        // Confirmación de depósito y generación de comprobante
        Swal.fire({
            title: "Depósito Exitoso",
            text: `Has depositado $${parseFloat(depositAmount).toFixed(2)}.`,
            icon: "success",
            confirmButtonText: "Generar Comprobante PDF"
        }).then(() => generatePDF("Depósito", parseFloat(depositAmount)));
    }
});

// Función para guardar transacciones en LocalStorage
function saveTransaction(type, amount) {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push({
        type,
        amount,
        date: new Date().toLocaleString()
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Función para generar el PDF
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