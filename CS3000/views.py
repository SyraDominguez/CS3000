from flask import render_template
from . import app


@app.route('/')
def entrar():
    return render_template('base.html')


@app.route('/home')
def iniciar():
    return render_template('home.html')


@app.route('/operations')
def operar():
    return render_template('operations.html')


@app.route('/status')
def checking():
    return render_template('status.html')


@app.route('/base')
def logout():
    return render_template('base.html')
