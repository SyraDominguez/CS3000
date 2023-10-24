window.addEventListener('DOMContentLoaded', (event) => {

// Deshabilitar las monedas

    // Crear una nueva solicitud XMLHttpRequest.
    const peticion = new XMLHttpRequest();

    // Obtener elementos del formulario select 'Coin From' y 'Coin To'.
    const coinFromSelect = document.getElementById('coin-from');
    const coinToSelect = document.getElementById('coin-to');

    // 1. Deshabilitar 'EUR' en 'Coin To' y 'BTC' en 'Coin From' al cargar la página.
    const coinToOptions = coinToSelect.querySelectorAll('option');
    const coinFromOptions = coinFromSelect.querySelectorAll('option');

    coinToOptions.forEach(option => {
        if (option.value === 'EUR') {
            option.disabled = true;
        } else {
            option.disabled = false;
        }
    });

    coinFromOptions.forEach(option => {
        if (option.value === 'BTC') {
            option.disabled = true;
        } else {
            option.disabled = false;
        }
    });

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

});
