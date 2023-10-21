function cargarMovimientos() {
    console.log('Has llamado a la funcion de Cargar Movimientos')
}

window.onload = function() {
    const boton = document.getElementById('boton-recarga');
    boton.addEventListener('click', cargarMovimientos);
    cargarMovimientos();
}