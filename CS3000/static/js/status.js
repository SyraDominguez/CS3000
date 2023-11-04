window.addEventListener('DOMContentLoaded', () => {
    cargarTotalInvestment();

    document.getElementById('boton-recarga-status').addEventListener('click', function() {
        // Recargando la pagina.
        location.reload();
    });
});

function cargarTotalInvestment() {
    const totalInvestmentField = document.getElementById('euros-gastados');
    const totalCryptoValueField = document.getElementById('valor-criptos');
    const totalBalanceField = document.getElementById('total-balance');

    fetch('/api/v1/total-investment')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                totalInvestmentField.value = data.total_invest.toFixed(2);

                // Calcula el total balance como 10,000 - Total Invest.
                const totalInvest = parseFloat(data.total_invest);
                const totalBalance = 10000 - totalInvest;
                totalBalanceField.value = totalBalance.toFixed(2);

                // Llama a la función para cargar el valor total de las criptomonedas.
                cargarCryptoTotalValue()
                    .then(totalCryptoValue => {
                        // Actualiza el campo 'Cryptocurrencies Value' con el valor de las criptomonedas.
                        totalCryptoValueField.value = totalCryptoValue.toFixed(2);
                    })
                    .catch(error => {
                        // Manejo de errores si la solicitud para cargar el valor de criptomonedas falla.
                        console.error(error);
                        totalCryptoValueField.value = 'Error';
                    });
            } else {
                // Manejo de errores si la solicitud para cargar el total de inversión falla.
                console.error(data.message);
                totalInvestmentField.value = 'Error';
                totalBalanceField.value = 'Error';
            }
        })
        .catch(error => {
            console.error(error);
            totalInvestmentField.value = 'Error';
            totalBalanceField.value = 'Error';
        });
}

function cargarCryptoTotalValue() {
    const totalCryptoValueField = document.getElementById('valor-criptos');

    if (!totalCryptoValueField.value) {
        return fetch('/api/v1/crypto-total-value')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    totalCryptoValueField.value = data.total_value.toFixed(2);
                    return data.total_value;
                } else {
                    // Manejo de errores si la solicitud falla.
                    console.error(data.message);
                    totalCryptoValueField.value = 'Error';
                    throw new Error('Error al cargar el valor de criptomonedas');
                }
            })
            .catch(error => {
                console.error(error);
                totalCryptoValueField.value = 'Error';
                throw error;
            });
    } else {
        return Promise.resolve(parseFloat(totalCryptoValueField.value));
    }
}
