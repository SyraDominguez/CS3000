from flask import flash, jsonify, redirect, render_template, request, url_for
from . import app
from .models import DBManager

################ VISTAS PARA TEMPLATES #################


"""ENLACE TEMPORAL PARA ENTRAR"""


@app.route('/')
def inicio():
    return render_template('login.html')


@app.route('/home')
def home():
    current_page = 'home.html'
    return render_template('home.html', current_page=current_page)


@app.route('/status')
def checking():
    current_page = 'status.html'
    return render_template('status.html', current_page=current_page)


@app.route('/login')
def logout():
    return render_template('login.html')
