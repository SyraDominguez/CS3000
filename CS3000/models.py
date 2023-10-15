import sqlite3


class DBManager:
    """
    SELECT id, Date, Time, Origin, Q_Invest, Buy, Q_Receive FROM movements
    """

    def __init__(self, ruta):
        self.ruta = ruta

    def consultaSQL(self, consulta):
        conection = sqlite3.connect(self.ruta)
        cursor = conection.cursor()
        cursor.execute(consulta)
        datos = cursor.fetchall()

        self.movements = []
        column_names = []
        for column in cursor.description:
            column_names.append(column[0])

        for dato in datos:
            movement = []
            index = 0
            for name in column_names:
                movement[name] = dato[index]
                index += 1
            self.movements.append(movement)

        conection.close()

        return self.movements
