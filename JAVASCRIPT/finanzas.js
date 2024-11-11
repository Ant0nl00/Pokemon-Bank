document.addEventListener("DOMContentLoaded", function() { 
    // Aquí va el código que interactúa con el DOM, como acceso a transactionTableBody
    const transactionTableBody = document.getElementById("transactionTableBody");
    if (!transactionTableBody) {
        console.error("No se encontró el elemento transactionTableBody en el DOM.");
    } else {
        // Actualizar la tabla y el gráfico al cargar el contenido
        actualizarTablaYGrafico();
    }
});

// Función que actualiza la tabla y el gráfico
function actualizarTablaYGrafico() {
    const transactionTableBody = document.getElementById("transactionTableBody");
    const ctx = document.getElementById("myChart");

    if (!transactionTableBody || !ctx) {
        console.error("No se encontró uno de los elementos del DOM.");
        return;
    }

    // Obtener las transacciones de localStorage
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // Limpiar la tabla antes de agregar nuevas filas
    transactionTableBody.innerHTML = "";

    // Variables para contar el total de cada tipo de transacción
    const transactionCounts = {
        "Depósito": 0,
        "Retiro": 0,
        "Pago": 0
    };

    // Llenar la tabla con el historial de transacciones y contar los tipos
    transactions.forEach(transaction => {
        if (!transaction.date || !transaction.type || transaction.amount == null) return;

        // Crear una nueva fila en la tabla
        const row = document.createElement("tr");

        // Crear y llenar celdas de la fila
        const dateCell = document.createElement("td");
        dateCell.textContent = transaction.date;

        const typeCell = document.createElement("td");
        typeCell.textContent = transaction.type;

        const amountCell = document.createElement("td");
        amountCell.textContent = `$${transaction.amount.toFixed(2)}`;

        // Agregar solo las celdas necesarias (Fecha, Tipo y Monto) a la fila
        row.appendChild(dateCell);
        row.appendChild(typeCell);
        row.appendChild(amountCell);

        // Agregar la fila al cuerpo de la tabla
        transactionTableBody.appendChild(row);

        // Contar las transacciones por tipo
        if (transaction.type in transactionCounts) {
            transactionCounts[transaction.type]++;
        }
    });

    // Generar el gráfico de transacciones
    new Chart(ctx.getContext("2d"), {
        type: "bar",
        data: {
            labels: Object.keys(transactionCounts),
            datasets: [{
                label: "Cantidad de Transacciones",
                data: Object.values(transactionCounts),
                backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
                borderColor: ["#4caf50", "#f44336", "#2196f3"],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Resumen de Transacciones'
                }
            }
        }
    });
}
