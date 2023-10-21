from datetime import date
import sqlite3

"""SELECT id, date, time, coinfrom, qinvest, cointo, qreceive FROM movements;"""


class DBManager:

    def conectar(self):
        conexion = sqlite3.connect(self.ruta)
        cursor = conexion.cursor()
        return conexion, cursor

    def desconectar(self, conexion):
        conexion.close()

    def __init__(self, ruta):
        self.ruta = ruta

    def consultaSQL(self, consulta):

        conexion = sqlite3.connect(self.ruta)

        cursor = conexion.cursor()

        cursor.execute(consulta)

        datos = cursor.fetchall()

        self.registros = []
        nombres_columna = []
        for columna in cursor.description:
            nombres_columna.append(columna[0])

        for dato in datos:
            movimiento = {}
            indice = 0
            for nombre in nombres_columna:
                movimiento[nombre] = dato[indice]
                indice += 1
            self.registros.append(movimiento)

        conexion.close()

        return self.registros

    def borrar(self, id):
        """
        DELETE FROM movimientos WHERE id = ?
            Diferenciar entre que falle la operacion y que la operacion
            no tenga efecto sobre la base de datos
        """

        sql = 'DELETE FROM movimientos WHERE id=?'
        conexion = sqlite3.connect(self.ruta)
        cursor = conexion.cursor()

        resultado = False
        try:
            cursor.execute(sql, (id,))
            conexion.commit()
            resultado = True
        except:
            conexion.rollback()

        conexion.close()
        return resultado

    def obtenerMovimiento(self, id):

        consulta = 'SELECT id, date, time, coinfrom, qinvest, cointo, qreceive FROM movements WHERE id=?'

        conexion, cursor = self.conectar()

        cursor.execute(consulta, (id,))

        datos = cursor.fetchone()
        resultado = None
        if datos:
            nombres_columna = []
            for columna in cursor.description:
                nombres_columna.append(columna[0])

            movimiento = {}
            indice = 0
            for nombre in nombres_columna:
                movimiento[nombre] = datos[indice]
                indice += 1
            movimiento['date'] = date.fromisoformat(movimiento['date'])
            resultado = movimiento

        self.desconectar(conexion)
        return resultado
