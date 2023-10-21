from flask import flash, jsonify, redirect, render_template, request, url_for
from . import app
from .models import DBManager

################ VISTAS PARA TEMPLATES #################


@app.route('/')
def entrar():
    return render_template('home.html')


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
