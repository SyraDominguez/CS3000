window.addEventListener('DOMContentLoaded', (event) => {

    //Deshabilitar las monedas

    const peticion = new XMLHttpRequest();
    
    const coinFromSelect = document.getElementById('coin-from');
    const coinToSelect = document.getElementById('coin-to');

    // 1. Deshabilitar 'EUR' en 'Coin To' y 'BTC' en 'Coin From' al cargar la página
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


    // 2. Cuando se elija una moneda en 'Coin From', deshabilitar la misma moneda en 'Coin To'
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

    // 3. Cuando se elija una moneda en 'Coin To', deshabilitar la misma moneda en 'Coin From'
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

    // Obtener el precio de una moneda from en moneda to
    async function getExchangeRate(coinFrom, coinTo) {
        const response = await fetch(`/operations/${coinFrom}/${coinTo}`);
        const data = await response.json();
        return data.rate;
    }

    // Inyectar los datos obtenidos en la pagina
    function injectData(data) {
        const puField = document.getElementById('p-u');
        puField.value = data.rate;

        const amountToField = document.getElementById('quantity-to');
        amountToField.value = data.amount_to;
    }

    // Vincular el evento del click del boton 'calculate'
    
    const calculateButton = document.getElementById('calculate-button');
    calculateButton.addEventListener('click', async () => {
        const coinFrom = document.getElementById('coin-from').value;
        const coinTo = document.getElementById('coin-to').value;
        const quantityFrom = parseFloat(document.getElementById('quantity-from').value);

        const rate = await getExchangeRate(coinFrom, coinTo);
        const amountTo = quantityFrom * rate;

        const data = {
            rate,
            amount_to: amountTo
        };

        injectData(data);
    });

    


    

});

