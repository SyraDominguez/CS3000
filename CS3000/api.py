from datetime import datetime
import requests

from flask import jsonify, render_template, request


from . import app
from .models import DBManager

CURRENCIES = [
    'EUR', 'BTC', 'ETH', 'USDT', 'ADA', 'SOL', 'XRP', 'DOT', 'DOGE', 'SHIB'
]

COINAPI_BASE_URL = 'https://rest.coinapi.io/v1'
API_KEY = 'E454727C-AB73-4CEF-B58B-07AF85EF3328'

################ VISTAS PARA API's #################


@app.route('/api/v1/movimientos')
def listar_movimimientos():
    try:
        db = DBManager(app.config['RUTA'])
        sql = 'SELECT id, date, time, coinfrom, qinvest, cointo, pu, qreceive FROM movements'
        movs = db.consultaSQL(sql)
        resultado = {
            'results': movs,
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


@app.route('/operations', methods=['GET', 'POST'])
def operar():
    if request.method == 'GET':
        # Devuelve el formulario vacío
        currencies = {'currencies': CURRENCIES}
        current_page = 'operations.html'
        return render_template('operations.html', current_page=current_page, **currencies)

    elif request.method == 'POST':
        coin_from = request.form.get('coin-from')
        coin_to = request.form.get('coin-to')
        quantity_from = float(request.form.get('quantity-from'))

        # Realizar una solicitud a la API para obtener el valor de una moneda from en moneda to
        api_url = f'{COINAPI_BASE_URL}/exchangerate/{coin_from}/{coin_to}?apikey={API_KEY}'
        response = requests.get(api_url)

        if response.status_code == 200:
            data = response.json()
            rate = data['rate']
            amount_to = quantity_from * rate

            # Guardar los datos relevantes en un diccionario JSON
            data_for_template = {
                'coin_from': coin_from,
                'coin_to': coin_to,
                'rate': rate,
                'amount_invest': quantity_from,
                'amount_to': amount_to
            }

            return jsonify(data_for_template), 200

        else:
            error_response = {
                'error_message': 'Error al obtener el precio de la moneda'}
            return jsonify(error_response), 500


@app.route('/operations/<coin_from>/<coin_to>', methods=['GET'])
def conseguir_cambio(coin_from, coin_to):
    api_url = f'{COINAPI_BASE_URL}/exchangerate/{coin_from}/{coin_to}?apikey={API_KEY}'
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        rate = data['rate']

        return jsonify({'rate': rate}), 200

    else:
        error_response = {
            'error_message': 'Error al obtener el precio de la moneda'}
        return jsonify(error_response), 500
