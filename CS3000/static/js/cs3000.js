const peticion = new XMLHttpRequest();

function cargarMovimientos() {
    peticion.open('GET', 'http://localhost:5000/api/v1/movimientos', true);
    peticion.send();
}

function mostrarMovimientos() {
    const resultados = JSON.parse(peticion.responseText);
    const movimientos = resultados.results;

    let html = '';
    if (movimientos.length === 0) {
        html = `
            <tr>
                <td colspan="7" class="lista-vacia">NO MOVEMENTS</td>
            </tr>
        `;
    } else {
        for (let i = 0; i < movimientos.length; i++) {
            const mov = movimientos[i];
            html += `
                <tr>
                    <td>${mov.date}</td>
                    <td>${mov.date}</td>
                    <td>${mov.coinfrom}</td>
                    <td>${mov.qinvest}</td>
                    <td>${mov.cointo}</td>
                    <td>${mov.pu}</td>
                    <td>${mov.qreceive}</td>
                </tr>
            `;
        }
    }

    const tabla = document.querySelector('#cuerpo-tabla');
    tabla.innerHTML = html;
}

window.onload = function() {
    const boton = document.getElementById('boton-recarga');
    boton.addEventListener('click', () => {
        cargarMovimientos();
    });

    cargarMovimientos();
    peticion.onload = mostrarMovimientos;
}
