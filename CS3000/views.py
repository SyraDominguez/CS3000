from flask import flash, jsonify, redirect, render_template, request, url_for
from . import app
from .models import DBManager


@app.route('/')
def entrar():
    return render_template('base.html')


@app.route('/home')
def iniciar():
    try:
        db = DBManager(app.config['RUTA'])
        sql = 'SELECT id, date, time, coinfrom, qinvest, cointo, qreceive FROM movements'
        movs = db.consultaSQL(sql)
        current_page = 'home.html'
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
# current_page=current_page)


@app.route('/operations')
def operar():
    current_page = 'operations.html'
    return render_template('operations.html', current_page=current_page)


@app.route('/status')
def checking():
    current_page = 'status.html'
    return render_template('status.html', current_page=current_page)


@app.route('/login')
def logout():
    return render_template('login.html')
