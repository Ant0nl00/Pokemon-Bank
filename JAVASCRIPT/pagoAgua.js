// Obtén el botón de pago y agrega un evento de clic
document.getElementById("btnPago").addEventListener("click", realizarPago);

// Función para agregar la transacción a localStorage
function agregarTransaccion(tipo, monto, concepto) {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const newTransaction = {
        date: new Date().toLocaleDateString(),
        type: tipo,
        amount: monto,
        concept: concepto
    };
    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function realizarPago() {
    // Obtener el monto a pagar desde el formulario
    const montoPago = parseFloat(document.getElementById("monto").value);
    let balance = parseFloat(localStorage.getItem("balance"));

    // Obtener otros datos del formulario
    const numeroFactura = "FAC" + Math.floor(Math.random() * 1000000); // Genera un número de factura aleatorio
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;

    if (isNaN(montoPago) || montoPago <= 0) {
        alert("Por favor, ingrese un monto válido.");
        return;
    }

    // Verifica si el saldo es suficiente
    if (montoPago <= balance) {
        // Deducir el monto del balance y actualizarlo en localStorage
        balance -= montoPago;
        localStorage.setItem("balance", balance.toFixed(2));
        alert("Pago exitoso. Su saldo actual es: $" + balance.toFixed(2));

        // Llamar a la función para agregar la transacción
        agregarTransaccion("Pago", montoPago, "Pago de Agua");

        // Llamar a la función para actualizar el gráfico y el historial
        // Esta función está definida en finanzas.js, no en pagarTelefono.js
        actualizarTablaYGrafico();  // Esta llamada funciona porque finanzas.js ya está cargado

        // Llamar a la función para generar el PDF
        generarPDF(numeroFactura, nombre, apellido, montoPago);
    } else {
        alert("Fondos insuficientes para realizar el pago.");
    }

    // Limpiar los campos del formulario
    document.querySelector("form").reset();
}

function generarPDF(numeroFactura, nombre, apellido, montoPago) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    console.log("Generando PDF con los siguientes datos:");
    console.log(`Número de Factura: ${numeroFactura}`);
    console.log(`Nombre: ${nombre}`);
    console.log(`Apellido: ${apellido}`);
    console.log(`Monto Pagado: ${montoPago}`);

    // Agregar contenido al PDF
    doc.setFontSize(16);
    doc.text("Factura de Pago", 20, 20);
    doc.setFontSize(12);
    doc.text("Número de Factura: " + numeroFactura, 20, 40);
    doc.text("Nombre: " + nombre, 20, 50);
    doc.text("Apellido: " + apellido, 20, 60);
    doc.text("Monto Pagado: $" + montoPago.toFixed(2), 20, 70);

    // Descargar el PDF
    doc.save("Factura_" + numeroFactura + ".pdf");
}

