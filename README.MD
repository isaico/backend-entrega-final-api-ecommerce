## Ecommerce backend by Isaias Garcia

Este proyecto fue realizado para la entrega final del curso de backend


## Descripcion

Se siguieron las rubricas de evaluacion para el desarrollo de esta api MVC 
[rubricas](https://docs.google.com/document/d/1bVNLHkuWU2ao1DWFQLK2qRH9Fw9PIqzl4xkQp0UNtmg/edit)

si esta documentacion no es suficiente aqui se encuentra completa con todos los detalles 

# Flow de la api

el flujo de esta api es visto a traves del localhost levantado por `nodemon` con el comando 
```
npm start

```
en el puerto por defecto 8080 

en esta version ``` "version": "1.0.0", ``` el archivo .env quedara expuesto para correcciones del profesor

#### se utilizo MONGO ATLAS como base de datos 

1. La ruta base sera "/" donde podremos logear y/o registrarnos 

2. luego podremos ver los productos disponibles si es que pudimos autenticarnos exitosamente 

3. al estar autenticados podremos generar un cart de la collection cart, generado automaticamente si tuvimos logeo exitoso

4. se podran agregar al carrito los productos listados dando al boton de agregar 

5. se generara una orden de compra con los productos seleccionados ingresando una direccion de envio 

6. se obtendra un N° de orden y se enviara al mail registrado por el usuario un detalle de la orden 


## Detalles de flow

1. utilizando json-web-token se genera el token de autorizacion y se guarda  en el session cookie alojado en una collection en la db
...para obtener un flow rapido dejo este usuario ya registrado para testear los endpoints de la api
`usuario: a`
`password: a`

2. los productos seran listados y se podra ingresar un id a la ruta para obtener un solo producto en especifico, ejemplo: "/api/products/62c72a833fe2668778501d26"
...tambien se podra seleccionar la cantidad deseada del producto, que tendra impacto en el cart

3. 4.  desde el carrito tendremos la lista de los productos agregados, el id del carrito y la opcion de ver consultas con un chat en vivo `creado con Socket.io` donde se podran ver todas las consultas o solo las generadas por un email en particular

5. 6. el metodo de envio de mail es creado con `Nodemailer`, el mail raiz desde donde se envian es configurable en las variables de entorno

 

## Detalles de la api

` Cada vez que el usuario se autentica tiene un tiempo de session determinado, si se expira pide nuevamente la autenticacion del mismo` 

`la api cuenta con un middleware de auth que chequea la existencia del token de autorizacion`


### Variables de entorno 

Desde un archivo .env con la variable NODE_ENV definiremos si es modo development o desarrollo, en ambos casos tendremos que remplazar en el futuro las variables extraidas directamente del .env y rempalzarlas por las entregadas en el archivo configEnv.js,
las deje en .env por conveccion

en la ruta 
"/srvenv" 
podremos obtener los valores de las variables previamente mencionadas pasadas por el archivo configEnv.js

## Dependencias
``` javascript
"dependencies": {
    "bcrypt": "^5.0.1",
    "connect-mongo": "^4.6.0",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.0.1",
    "ejs": "^3.1.8",
    "express": "^4.18.1",
    "express-session": "^1.17.3",
    "http": "^0.0.1-security",
    "jsonwebtoken": "^8.5.1",
    "mongodb": "^4.8.1",
    "mongoose": "^6.5.2",
    "nodemailer": "^6.7.7",
    "socket.io": "^4.5.1",
    "underscore": "^1.13.4"
  }
  ```




