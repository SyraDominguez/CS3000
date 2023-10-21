const peticion = new XMLHttpRequest();

function cargarMovimientos() {
    console.log('Has llamado a la funcion de Cargar Movimientos');
    peticion.open('GET', 'http://localhost:5000/api/v1/movimientos', false);
    peticion.send();
    console.log(peticion.responseText);
}

window.onload = function() {
    console.log('Ya se han cargado los elementos de la pagina');
    const boton = document.getElementById('boton-recarga');
    boton.addEventListener('click', cargarMovimientos);
    console.log('FIN de la funcion window.onload');
}