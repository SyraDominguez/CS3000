from datetime import datetime
import requests

from flask import jsonify, redirect, render_template, request, url_for


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


@app.route('/api/v1/movimientos/<int:id>')
def buscar_movimientos(id):
    try:
        db = DBManager(app.config['RUTA'])
        mov = db.obtenerMovimiento(id)
        if mov:
            resultado = {
                'status': 'success',
                'results': mov
            }
            status_code = 200
        else:
            resultado = {
                'status': 'error',
                'message': f'No he encontrado ningun movimiento con el ID = {id}'
            }
            status_code = 404
    except Exception as error:
        resultado = {
            'status': 'error',
            'message': str(error)
        }
        status_code = 500

    return jsonify(resultado), status_code
