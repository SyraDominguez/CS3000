async function cargarTotalInvestment() {
    const totalInvestmentField = document.getElementById('euros-gastados');
    const totalCryptoValueField = document.getElementById('valor-criptos');

    try {
        const response = await fetch('/api/v1/total-investment');
        const data = await response.json();

        if (data.status === 'success') {
            totalInvestmentField.value = data.total_invest.toFixed(2);

            // Inyectar el resultado de la función en el campo "Total Invest".
            const totalInvestFieldInTable = document.querySelector('[id="list-cryptos"] tbody tr:first-child td:first-child');
            if (totalInvestFieldInTable) {
                totalInvestFieldInTable.textContent = data.total_invest.toFixed(2);
            }

            // Cargar el valor total de las criptomonedas.
            await cargarCryptoTotalValue();
        } else {
            console.error(data.message);
            totalInvestmentField.value = 'Error';
        }
    } catch (error) {
        console.error(error);
        totalInvestmentField.value = 'Error';
    }
}

async function cargarListaCriptos() {
    const listaCriptosField = document.getElementById('list-cryptos');

    await cargarTotalInvestment();

    try {
        const response = await fetch('/api/v1/crypto-list');
        const data = await response.json();

        if (data.status === 'success') {
            listaCriptosField.innerHTML = '';

            data.results.forEach(cripto => {
                let tr = document.createElement('tr');

            // Formatear los datos antes de mostrarlos en la tabla
            function formatData(coin, amount) {
                return `
                    <td>${coin}</td>
                    <td>${amount}</td>
                    `;
            }
            
            const formattedData = formatData(cripto.coin_to, cripto.amount_acquired);
                
                tr.innerHTML = `<td>${formattedData}</td>`;
                listaCriptosField.appendChild(tr);
            });

            // Inyectar el resultado de la función en el campo "Total Invest".
            const totalInvestFieldInTable = document.querySelector('[id="list-cryptos"] tbody tr:first-child td:first-child');
            if (totalInvestFieldInTable) {
                totalInvestFieldInTable.textContent = await cargarTotalInvestment();
            }
        } else {
            console.error(data.message);
            listaCriptosField.innerHTML = 'Error al cargar la lista de criptomonedas';
        }
    } catch (error) {
        console.error(error);
        listaCriptosField.innerHTML = 'Error al cargar la lista de criptomonedas';
    }
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

window.addEventListener('DOMContentLoaded', () => {
    cargarTotalInvestment();
    cargarListaCriptos();
    
    document.getElementById('boton-recarga-status').addEventListener('click', function() {
        // Recargando la pagina.
        location.reload();
    });
});