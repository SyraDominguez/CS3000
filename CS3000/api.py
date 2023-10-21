from flask import jsonify

from . import app
from .models import DBManager

################ VISTAS PARA API's #################


@app.route('/api/v1/movimientos')
def listar_movimimientos():
    try:
        db = DBManager(app.config['RUTA'])
        sql = 'SELECT id, date, time, coinfrom, qinvest, cointo, qreceive FROM movements'
        movs = db.consultaSQL(sql)
        resultado = {
            'results': movs,
            'status': 'success'
        }
    except Exception as ex:
        resultado = {
            'status': 'error',
            'message': str(ex)
        }
    return jsonify(resultado)
