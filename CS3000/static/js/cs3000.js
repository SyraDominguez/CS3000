const peticion = new XMLHttpRequest();

function cargarMovimientos() {
    console.log('Has llamado a la funcion de Cargar Movimientos');
    peticion.open('GET', 'http://localhost:5000/api/v1/movimientos', false);
    peticion.send();
    const resultados = JSON.parse(peticion.responseText);
    const movimientos = resultados.results;

    let html = '';
    for (let i = 0; i < movimientos.length; i++) {
        const mov = movimientos[i];
        html = html + `
            <tr>
                <td>${mov.date}</td>
                <td>${mov.date}</td>
                <td>${mov.coinfrom}</td>
                <td>${mov.qinvest}</td>
                <td>${mov.cointo}</td>
                <td>${mov.qreceive}</td>
            </tr>
        `;
    }
    console.log('html', html);
    const tabla = document.querySelector('#cuerpo-tabla');
    tabla.innerHTML = html;
}

window.onload = function() {
    console.log('Ya se han cargado los elementos de la pagina');
    const boton = document.getElementById('boton-recarga');
    boton.addEventListener('click', cargarMovimientos);
    console.log('FIN de la funcion window.onload');
}