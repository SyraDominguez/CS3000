window.addEventListener('DOMContentLoaded', (event) => {

// Deshabilitar las monedas

    // Crear una nueva solicitud XMLHttpRequest.
    const peticion = new XMLHttpRequest();

    // Obtener elementos del formulario select 'Coin From' y 'Coin To'.
    const coinFromSelect = document.getElementById('coin-from');
    const coinToSelect = document.getElementById('coin-to');
    const coinToOptions = coinToSelect.querySelectorAll('option');
    const coinFromOptions = coinFromSelect.querySelectorAll('option');

    // 2. Cuando se elija una moneda en 'Coin From', deshabilitar la misma moneda en 'Coin To'.
    coinFromSelect.addEventListener('change', function() {
        const coinFrom = this.value;
        const coinToOptions = coinToSelect.querySelectorAll('option');

        coinToOptions.forEach(option => {
            if (option.value === coinFrom) {
                option.disabled = true;
            } else {
                option.disabled = false;
            }
        });
    });

    // 3. Cuando se elija una moneda en 'Coin To', deshabilitar la misma moneda en 'Coin From'.
    coinToSelect.addEventListener('change', function() {
        const coinTo = this.value;
        const coinFromOptions = coinFromSelect.querySelectorAll('option');

        coinFromOptions.forEach(option => {
            if (option.value === coinTo) {
                option.disabled = true;
            } else {
                option.disabled = false;
            }
        });
    });

    // Función para obtener el precio de una moneda from en moneda to.
    async function getExchangeRate(coinFrom, coinTo) {

        const response = await fetch(`/operations/${coinFrom}/${coinTo}`);
        const data = await response.json();

        return data.rate;
    }

    // Función para inyectar los datos obtenidos en la página.
    function injectExchangeRate(amountInvest, coinFrom, coinTo, rate, amountAcquired) {
        const puInput = document.getElementById('pu');
        const amountAcquiredInput = document.getElementById('amount_acquired');

        puInput.value = rate;
        amountAcquiredInput.value = amountInvest * rate;
    }

    // Vincular todos estos calculos al evento click del botón 'calculate'.
    document.getElementById('calculate-button').addEventListener('click', async () => {
        const coinFrom = document.getElementById('coin-from').value;
        const coinTo = document.getElementById('coin-to').value;
        const amountInvest = parseFloat(document.getElementById('amount_invest').value);

        const rate = await getExchangeRate(coinFrom, coinTo);
        injectExchangeRate(amountInvest, coinFrom, coinTo, rate);
    });


    // Función para confirmar la operación.
    async function confirmOperation() {
        const coinFrom = document.getElementById('coin-from').value;
        const coinTo = document.getElementById('coin-to').value;
        const amountInvest = parseFloat(document.getElementById('amount_invest').value);
        const amountAcquired = parseFloat(document.getElementById('amount_acquired').value);
        const date = new Date();
        const time = date.toLocaleTimeString();
        
        try {
            // Obtenemos el tipo de cambio.
            const rate = await getExchangeRate(coinFrom, coinTo);

            // Enviamos los datos de la operación a la base de datos.
            const request = new Request('/api/v1/submit-conversion', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    coin_from: coinFrom,
                    amount_invest: amountInvest,
                    coin_to: coinTo,
                    amount_acquired: amountAcquired,
                    date: date.toLocaleDateString(),
                    time: time,
                    pu: rate 
                })
            });

            const response = await fetch(request);
            const data = await response.json();

            if (data.status === 'success') {
                alert('Operación realizada correctamente');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Error al obtener el tipo de cambio.');
        }
    }
    // Vincular el evento click del botón 'confirm' a la función 'confirmOperation()'.
    document.getElementById('confirm-button').addEventListener('click', confirmOperation);

    const clearButton = document.querySelector("#clear-button");

    clearButton.addEventListener("click", function() {
        // Limpia la página
        document.getElementById("conversion").reset();
    });

});

