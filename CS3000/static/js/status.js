window.addEventListener('DOMContentLoaded', () => {
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

    cargarTotalInvestment();
});
