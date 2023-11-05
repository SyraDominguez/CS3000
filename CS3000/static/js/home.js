const peticion = new XMLHttpRequest();

function cargarMovimientos() {
    peticion.open('GET', 'http://localhost:5000/api/v1/movimientos', true);
    peticion.send();
    }

function mostrarMovimientos() {
    const resultados = JSON.parse(peticion.responseText);
    const movimientos = resultados.results;

    // Obtener los movimientos de compra de euros a otra moneda
    const movimientosCompra = movimientos.filter((movimiento) => movimiento.coin_from === 'EUR');

    // Inicializar el contador en 10.000 euros si no hay movimientos
    let contador = document.getElementById('contador');
    if (movimientosCompra.length === 0) {
        contador.innerText = '€10.000';
    } else {
        // Restar el valor de los movimientos del contador
        contador.innerText = (
            movimientosCompra.reduce((total, movimiento) => total - movimiento.amount_invest, 10000)
            ).toFixed(2) + ' €';
    }

    // Sumar el valor de los movimientos de venta de euros a otra moneda
    const movimientosVenta = movimientos.filter((movimiento) => movimiento.coin_to === 'EUR');
    let balance = 10000;
    movimientosVenta.forEach((movimiento) => {
    balance += movimiento.amount_acquired;
    });

    // Restar el valor de los movimientos de compra de euros a otra moneda
    const movimientosCompraEUR = movimientos.filter((movimiento) => movimiento.coin_from === 'EUR');
    movimientosCompraEUR.forEach((movimiento) => {
    balance -= movimiento.amount_invest;
    });

    // Actualizar el contador con el nuevo balance
    contador.innerText = balance.toFixed(2) + ' €';

    // Mostrar los movimientos en la tabla
    const tabla = document.querySelector('#cuerpo-tabla');
    tabla.innerHTML = '';
    for (let i = 0; i < movimientos.length; i++) {
        const mov = movimientos[i];
        tabla.innerHTML += `
        <tr>
            <td>${mov.date}</td>
            <td>${mov.time}</td>
            <td>${mov.coin_from}</td>
            <td>${mov.amount_invest}</td>
            <td>${mov.coin_to}</td>
            <td>${mov.pu}</td>
            <td>${mov.amount_acquired}</td>
        </tr>
        `;
    }

    if (movimientos.length === 0) {
        tabla.innerHTML = `
        <tr>
            <td colspan = "7" class="lista-vacia">NO MOVEMENTS</td>
        </tr>
        `;
    }
}

function resetearMovimientos() {
    // Puedes mostrar un mensaje de confirmación antes de realizar el reset si lo deseas.
    const confirmar = confirm('¿Seguro que quieres resetear los movimientos? Esto eliminará todos los registros.');

    if (confirmar) {
        // Envía una solicitud al servidor para restablecer los movimientos
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/api/v1/reset-movements', true);
        xhr.send();

        xhr.onload = () => {
            if (xhr.status === 200) {
                alert('Movimientos eliminados correctamente');
                cargarMovimientos(); // Recarga los movimientos después de restablecerlos
            } else {
                alert('Error al eliminar movimientos');
            }
        };
    }
}
    
window.onload = function() {
    const boton = document.getElementById('boton-recarga');
    boton.addEventListener('click', () => {
        cargarMovimientos();
    });

    // Controlador de eventos para el botón "Reset"
    const botonReset = document.getElementById('boton-reset');
    botonReset.addEventListener('click', () => {
        resetearMovimientos();
    });

    cargarMovimientos();
    peticion.onload = mostrarMovimientos;
}