from datetime import datetime
import requests

from flask import jsonify, render_template, request

# Importar la clase DBManager desde el módulo 'models' de la aplicación.
from . import app
from .models import DBManager

# Lista de monedas disponibles.
CURRENCIES = [
    'EUR', 'USD', 'BTC', 'ETH', 'USDT', 'ADA', 'SOL', 'XRP', 'DOT', 'DOGE', 'SHIB'
]

# URL base de la API externa y clave de API.
COINAPI_BASE_URL = 'https://rest.coinapi.io/v1'
API_KEY = 'pon-aqui-tu-API-supersecreta'

# Instancia de DBManager
db = DBManager(app.config['RUTA'])

# Función para guardar un movimiento en la base de datos.


@app.route('/api/v1/movimientos')
def listar_movimientos():
    """
    Lista los movimientos de la Base de Datos.

    Returns:
        Una respuesta JSON con el siguiente formato:
        {
            "results": [
                {
                    "id": 1,
                    "date": "2023-10-24",
                    "time": "10:00:00",
                    "coin_from": "EUR",
                    "amount_invest": 1000,
                    "coin_to": "BTC",
                    "pu": 20000,
                    "amount_acquired": 0.05
                },
                ...
            ],
            "status": "success"
        }
    """

    try:
        # Ejecutar la consulta SQL y obtener los resultados.
        movs = db.consultaSQL(
            'SELECT id, date, time, coin_from, amount_invest, coin_to, pu, amount_acquired FROM movements')

        # Convertir la lista de tuplas en una lista de diccionarios.
        resultados = []
        for mov in movs:
            resultados.append({
                'id': mov[0],
                'date': mov[1],
                'time': mov[2],
                'coin_from': mov[3],
                'amount_invest': mov[4],
                'coin_to': mov[5],
                'pu': mov[6],
                'amount_acquired': mov[7]
            })

        resultado = {
            'results': resultados,
            'status': 'success'
        }
        status_code = 200

    except Exception as ex:
        resultado = {
            'status': 'error',
            'message': str(ex)
        }
        status_code = 500
    return jsonify(resultado), status_code


@app.route('/api/v1/reset-movements', methods=['POST'])
def reset_movements():
    try:
        # Llama a la función para borrar los movimientos
        db.borrarMovimientos()
        return jsonify({
            'status': 'success',
            'message': 'Movimientos eliminados correctamente'
        }), 200
    except Exception as ex:
        return jsonify({
            'status': 'error',
            'message': str(ex)
        }), 500


# Ruta para realizar una operación de cambio de moneda.


@app.route('/operations', methods=['GET', 'POST'])
def operar():

    if request.method == 'GET':
        # Devolver el formulario vacío con la lista de monedas disponibles.
        currencies = {'currencies': CURRENCIES, 'user_balance': 10000}
        current_page = 'operations.html'
        return render_template('operations.html', current_page=current_page, **currencies)

    elif request.method == 'POST':
        # Solicitud a la API para obtener el tipo de cambio.
        coin_from = request.form['coin_from']
        coin_to = request.form['coin_to']
        amount_invest = float(request.form['amount_invest'])
        date = datetime.now()

        try:
            api_url = f'{COINAPI_BASE_URL}/exchangerate/{coin_from}/{coin_to}?apikey={API_KEY}'
            response = requests.get(api_url)

            if response.status_code == 200:
                data = response.json()
                rate = data['rate']

            else:
                error_response = {
                    'error_message': 'Error al obtener el precio de la moneda'
                }
                return jsonify(error_response), 500

        except Exception as ex:
            resultado = {
                'status': 'error',
                'message': str(ex)
            }
            status_code = 500

        return jsonify(resultado), status_code


# Ruta para obtener el tipo de cambio entre dos monedas específicas.
@app.route('/operations/<coin_from>/<coin_to>', methods=['GET'])
def cambiar_moneda(coin_from, coin_to):

    api_url = f'{COINAPI_BASE_URL}/exchangerate/{coin_from}/{coin_to}?apikey={API_KEY}'
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()

        try:
            src_side_base = data['src_side_base']
        except KeyError:
            src_side_base = None

        return jsonify({
            'time': data['time'],
            'asset_id_base': data['asset_id_base'],
            'asset_id_quote': data['asset_id_quote'],
            'rate': data['rate'],
            'src_side_base': src_side_base
        }), 200

    else:
        error_response = {
            'error_message': 'Error al obtener el precio de la moneda'
        }
        return jsonify(error_response), 500

# Ruta para guardar el movimiento.


@app.route('/api/v1/submit-conversion', methods=['POST'])
def submit_conversion():

    # # Obtener los datos de la operación de la solicitud POST.
    operation_data = request.json

    # Guardar los datos de la operación en la base de datos.
    db.guardarMovimiento(
        operation_data['coin_from'],
        operation_data['amount_invest'],
        operation_data['coin_to'],
        operation_data['amount_acquired'],
        operation_data['date'],
        operation_data['time'],
        operation_data['pu']
    )

    # Devolver una respuesta al cliente.
    return jsonify({
        'status': 'success',
        'message': 'Operación realizada correctamente'
    })

# Ruta para obtener el total invertido


@app.route('/api/v1/total-investment', methods=['GET'])
def total_investment():
    try:
        # Obtener los movimientos de compra de euros a otras monedas.
        movimientosCompra = db.consultaSQL(
            'SELECT amount_invest FROM movements WHERE coin_from="EUR"')

        # Calcular el total invertido.
        total_invest = sum(movimiento[0] for movimiento in movimientosCompra)

        return jsonify({
            'total_invest': total_invest,
            'status': 'success'
        }), 200
    except Exception as ex:
        return jsonify({
            'status': 'error',
            'message': str(ex)
        }), 500


@app.route('/api/v1/crypto-list', methods=['GET'])
def get_crypto_list():
    try:
        # Obtener los movimientos de compra de moneda del usuario
        movimientosCompra = db.consultaSQL(
            'SELECT coin_to, SUM(amount_acquired) FROM movements WHERE coin_from="EUR" GROUP BY coin_to')

        crypto_list = []
        for movimiento in movimientosCompra:
            coin_to, amount_acquired = movimiento
            crypto_list.append({
                'coin_to': coin_to,
                'amount_acquired': amount_acquired
            })

        return jsonify({
            'results': crypto_list,
            'status': 'success'
        }), 200

    except Exception as ex:
        return jsonify({
            'status': 'error',
            'message': str(ex)
        }), 500

# Ruta para obtener el valor total de las criptomonedas del usuario.


@app.route('/api/v1/crypto-total-value', methods=['GET'])
def get_crypto_total_value():
    try:
        # Obtener la lista de monedas que el usuario ha comprado.
        movimientosCompra = db.consultaSQL(
            'SELECT coin_to, amount_acquired FROM movements WHERE coin_from="EUR"')

        # Obtener una lista de las criptomonedas únicas en los movimientos
        unique_coins = list(set(coin for coin, _ in movimientosCompra))

        # Crear un diccionario para almacenar los tipos de cambio
        exchange_rates = {}

        # Obtener los tipos de cambio de todas las criptomonedas en una sola llamada
        for coin in unique_coins:
            api_url = f'{COINAPI_BASE_URL}/exchangerate/{coin}/EUR?apikey={API_KEY}'
            response = requests.get(api_url)

            if response.status_code == 200:
                data = response.json()
                rate = data['rate']
                exchange_rates[coin] = rate

        total_value = 0

        # Calcular el valor total para cada criptomoneda
        for movimiento in movimientosCompra:
            coin_to, amount_acquired = movimiento
            # Obtener el tipo de cambio correspondiente
            rate = exchange_rates.get(coin_to, 0)
            total_value += rate * amount_acquired

        return jsonify({
            'total_value': total_value,
            'status': 'success'
        }), 200

    except Exception as ex:
        return jsonify({
            'status': 'error',
            'message': str(ex)
        }), 500
