# CS3000 - CryptoSimulator 3000

Donde los euros se convierten en cripto-tesoros

---

## Descripción

CS3000 es una aplicación web que te permite simular inversiones en criptomonedas utilizando euros como moneda base. Realiza compras y ventas de criptomonedas para ver cómo evoluciona tu cartera de inversiones.

**"Donde los euros se convierten en cripto-tesoros."**

## Contenido

- [CS3000 - CryptoSimulator 3000](#cs3000---cryptosimulator-3000)
  - [Descripción](#descripción)
  - [Contenido](#contenido)
  - [Instalación](#instalación)
    - [Requisitos previos](#requisitos-previos)
    - [Pasos de instalación](#pasos-de-instalación)
  - [Configuración](#configuración)
  - [Uso](#uso)
    - [Iniciar la aplicación](#iniciar-la-aplicación)
  - [Capturas](#capturas)
    - [Notas Adicionales](#notas-adicionales)
  - [Características](#características)
    - [Contacto](#contacto)
    - [Agradecimientos](#agradecimientos)
  - [Notas de la Versión v1.1 (Próximas Mejoras)](#notas-de-la-versión-v11-próximas-mejoras)
    - [Futuras Versiones](#futuras-versiones)

## Instalación

A continuación, se detallan los pasos para instalar la aplicación CS3000 en tu entorno de desarrollo.

### Requisitos previos

Asegúrate de tener instalado lo siguiente:

- [Python 3](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/)
- [Flask-CORS](https://flask-cors.readthedocs.io/)

### Pasos de instalación

1. Clona el repositorio de CS3000 desde GitHub:

   ```shell
   git clone https://github.com/SyraDominguez/CS3000.git
   ```

2. Ve al directorio del proyecto:

   ```shell
   cd cs3000
   ```

3. Crea un entorno virtual (opcional pero recomendado):

   ```shell
   python -m venv venv
   ```

4. Activa el entorno virtual:

   - En Windows:

     ```shell
     venv\Scripts\activate
     ```

   - En macOS y Linux:

     ```shell
     source venv/bin/activate
     ```

5. Instala las dependencias del proyecto:

   ```shell
   pip install -r requirements.txt
   ```

## Configuración

Antes de ejecutar la aplicación, debes configurar tus credenciales de API para obtener datos de criptomonedas en tiempo real. Edita el archivo `api.py` y busca la variable `API_KEY`. Reemplaza `'pon-aqui-tu-API-supersecreta'` por tu clave de API proporcionada por la fuente de datos de criptomonedas.

## Uso

### Iniciar la aplicación

1. Ejecuta la aplicación Flask con el siguiente comando:

   ```shell
   flask run
   ```

2. Abre tu navegador web y navega a `http://localhost:5000` para acceder a la página de inicio de CS3000.

3. Sigue las instrucciones en la interfaz de usuario para simular inversiones en criptomonedas.

## Capturas

1. ![LOGIN](https://github.com/SyraDominguez/CS3000/blob/main/Capturas/1.Login.png?raw=true)

2. ![LISTADO DE MOVIMIENTOS](https://github.com/SyraDominguez/CS3000/blob/main/Capturas/2.Lista%20Movimientos%20.png?raw=true)
3. ![PANTALLA DE OPERACIONES](https://github.com/SyraDominguez/CS3000/blob/main/Capturas/3.Operations.png?raw=true)
4. ![ESTADO FINANCIERO](https://github.com/SyraDominguez/CS3000/blob/main/Capturas/4.Status.png?raw=true)

### Notas Adicionales

No son necesarios Usuario y Contraseña (05/11/2023)

## Características

- **Simulación de inversiones:** Realiza compras y ventas de criptomonedas utilizando euros como moneda base.
- **Estado de inversión:** Visualiza el estado de tus inversiones y el valor total de tus criptomonedas.
- **Listado de movimientos:** Consulta un historial de todas las transacciones realizadas.
- **Restablecimiento de movimientos:** Restablece todos los movimientos de inversión para comenzar de nuevo.

### Contacto

---

syradominguez.dev@gmail.com

### Agradecimientos

Gracias a @tonybolanyo por su paciencia infinita y todo lo que nos ha enseñado. Y al equipo de @keepcoding por esta oportunidad.

## Notas de la Versión v1.1 (Próximas Mejoras)

### Futuras Versiones

- Implementar acceso con usuario y contraseña
- [Mejora] Limitar operaciones con cryptos en función de las cryptos compradas
- [Mejora] Actualización del diseño de la página de operaciones y status.
- [Corrección de errores] Optimización de código, accesos a la API

- [Próximas funciones] - en Desarrollo

---
