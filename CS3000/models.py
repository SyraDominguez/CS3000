from datetime import datetime
import sqlite3


from datetime import date
import sqlite3


class DBManager:

    def __init__(self, ruta):
        self.ruta = ruta

    # Conectar a la base de datos SQLite en la ruta especificada.
    def conectar(self):
        self.conexion = sqlite3.connect(self.ruta)
        self.cursor = self.conexion.cursor()

    # Cerrar la conexión a la base de datos.
    def desconectar(self):
        self.conexion.close()

    # Consulta a Base de Datos
    def consultaSQL(self, consulta):
        self.conectar()
        self.cursor.execute(consulta)
        datos = self.cursor.fetchall()
        self.desconectar()
        return datos

    # Guardar el movimiento en Base de Datos

    def guardarMovimiento(self, coin_from, amount_invest, coin_to, amount_acquired, date, time, pu):
        consulta = """
            INSERT INTO movements (coin_from, amount_invest, coin_to, amount_acquired, date, time, pu)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """

        self.conectar()
        self.cursor.execute(
            consulta, (coin_from, amount_invest, coin_to, amount_acquired, date, time, pu))
        self.conexion.commit()

        self.desconectar()
