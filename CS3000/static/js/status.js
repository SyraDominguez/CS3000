window.addEventListener('DOMContentLoaded', () => {
    cargarTotalInvestment();
});

window.addEventListener('load', () => {
    cargarCryptoTotalValue();
});

function cargarTotalInvestment() {
    const totalInvestmentField = document.getElementById('euros-gastados');

    // Realiza una solicitud GET para obtener el total invertido desde el servidor.
    fetch('/api/v1/total-investment')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                totalInvestmentField.value = data.total_invest.toFixed(2);
            } else {
                // Manejo de errores si la solicitud falla.
                console.error(data.message);
                totalInvestmentField.value = 'Error';
            }
        })
        .catch(error => {
            console.error(error);
            totalInvestmentField.value = 'Error';
        });
}

function cargarCryptoTotalValue() {
    const totalCryptoValueField = document.getElementById('valor-criptos');

    // Realiza una solicitud GET para obtener el valor total de criptomonedas desde el servidor.
    fetch('/api/v1/crypto-total-value')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                totalCryptoValueField.value = data.total_value.toFixed(2);
            } else {
                // Manejo de errores si la solicitud falla.
                console.error(data.message);
                totalCryptoValueField.value = 'Error';
            }
        })
        .catch(error => {
            console.error(error);
            totalCryptoValueField.value = 'Error';
        });
}
