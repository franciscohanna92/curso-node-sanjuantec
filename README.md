# Curso Node.js - San Juan TEC
Pueden encontrar las diapositivas de este curso en [este link](https://drive.google.com/drive/folders/1CeIiivTlv19YdhY07x703GxCAJ-jhw9s)

En este repositorio encontrarás los programas y módulos que vayamos desarrollando durante el cursado. 

Habrá una carpeta por cada clase y dentro de la misma el código escrito en esa clase. 

Con el seguir de las clases iré actualizando este README con instrucciones y detalles sobre dichos programas.

## 01 Introducción
En esta clase analizamos los conceptos de módulo y paquetes en Node. Vimos como inicializar un proyecto de Node/npm (`npm init`)

Aprendimos como definir un y exportar un módulo y como importarlo y utilizarlo. Para eso hicimos un módulo muy sencillo llamado `calculadora.js`.

Luego, vimos como podemos utilizar paquetes publicados en [npmjs.com](npmjs.com). Aprendimos que el ecosistema de paquetes de Node es gigante. Instalamos y utilizamos dos paquetes populares, `lodash` y `mathjs`. Aprendimos como importar solo la funcionalidad que necesitamos de un módulo para hacer nuestro código mas óptimo (`const { find } = require('lodash')`). Definimos un módulo la clase `User` en su propio módulo y definimos un módulo `users.js` que nos permite obtener un listado de usuarios, buscar un usuario por Id y agregar usuarios a un arreglo.

## 02 Node.js y la web
En esta clase comprendimos el rol que juega Node en la web y como podemos utilizarlo como un servidor web que provee dos tipos de recurso: HTML y JSON. Para esto programamos un servidor web desde cero utilizando solo el módulo `http`, perteneciente al Code de Node.

Nuestro servidor, definido en `servidor.js` tiene la posibilidad de entregar una página web sencilla en la ruta `localhost:3000/index.html` y un listado de usuarios en `localhost:3000/users` (esto utilizando el módulo `users.js` de la clase anterior). Además, retorna un error 500 ante un error en el código, y un error 404 cuando se solicita un recurso inexistente.

Posibles mejoras al servidor incluyen:
1. Definir una ruta que nos permita manejar peticiones del tipo `/users?id=1`, retornando el usuario con el Id especificado en la querystring `?id=1`. Para esto, podemos valernos del módulo `url` y la función `url.parse(req.url)`.
2. Modularizar nuestro código llevando los _controladores_ de rutas (`devolverPaginaWeb`, `devolverJsonDeUsuarios`, etc), a un archivo llamado `controllers.js` e importar estas funciones desde el módulo `servidor.js`.
3. Permitir agregar usuarios al arreglo de usuarios mediante una ruta `POST /users` (pueden identificar el método HTTP con `req.method`), enviando los datos del usuario como un JSON en el body del request. Para esto, deben leer el body de un request utilizando los eventos `req.on('data')` y `req.on('end')`, y generando un objeto con `let body = JSON.parse(<datos leidos del request body>)`. 

## 03 Introducción a Express
En esta clase comenzamos a trabajr con Express, un framework muy popular para desarrllo de APIs en Node.js.

Entendimos como funciona una aplicación de express, analizando como define rutas y y sus respectivos handlers. Analizamos y comprendimos el concepto de middleware y como estos son una funcionalidad principal en Express.

En la parte práctica: 

- Implementamos nuestra primera aplicación de Express a partir del servidor web hecho solo con Node.js de la clase anterior. Vimos como Express identifica el tipo de respuesta que se está devolviendo y setea el header `Content-Type` automaticamente. Esta app se encuentra en `03-express-introduccion/primer-app-express`.
- Implementamos un middleware para loggear requests a nuestra aplicación. Además, vimos como utilizar middleware de terceros, en particular, como usar `body-parser` para parsear el body JSON de un request. También, vimos como separar la definicion de nuestra app Express, de la definicion del servidor que escuchar peticiones, introduciendo asi el concepto de modularizacion en Express. Todo esto se encuentra en la carpeta `03-express-introduccion/app-middleware-modular`.

Como ejercicios propuesto se dejan:
1. Investigar el uso de middleware para loggeo como `morgan` o `winston`.
2. Investigar y deinfinir middleware para manejo de errores y excepciones.
3. Investigar como establecer los headers de un request en Postman.
4. Crear un middleware para autenticación que verifique la presencia de un header en el request llamado `Authorization`. Para esto se puede utilizar la propiedad `req.headers` o el metodo `req.header('...')` de los request en los middleware. En caso de no existir dicho header, se debe rechazar el request con un error 401. 

## 04 Ruteo en Express
En esta clase se estudiaron los conceptos de ruteo a nivel general y particularmente en Express
Sobre rutas vimos los conceptos de querystring, path parameters y se repasaron los verbos HTTP y su semántica asociada. 

Luego se vió como manejar querystring y path parameters en Express, en conjunto con el uso del submódulo Router. Este último se utilizó para modularizar una aplicación. 

A nivel de ejercitación comenzamos a trabajar sobre una API para el sistema de una veterinaria, aplicando los conceptos vistos hasta el momento.

## 05 REST: Arquitectura y APIs
En esta clase se vió la arquitectura REST, sus ventajas y restricciones de diseño que aplica sobre una API. Comprendimos que REST es la manera en la cuál funciona actualmente la web y que es una arquitectura de software que DEBEMOS seguir en el desarrollo de nuestras APIs.

En la parte de ejercitación, seguimos trabajando sobre la API vterinaria, extendiendo la misma con las restricciones de diseño REST, agregando rutas OPTIONS, hipervínculos a los documentos JSON y status  HTTP más claros y descriptivos.

## 06 REST: Diseño y documentación
En esta clase analizamos como y por que debemos diseñar y documentar nuestras APIs. Particularmente, nos enfocamos en la _Open API Specification v3_ para generar documentación.

En la parte de ejercitación nos enfocamos en escribir un documento OAS3 para la API veterinaria, para luego aprender a generar un documento HTML con la especificación de nuestra API. A este documento HTML lo montamos en una ruta de nuestra API Veterinaria para que sea accesible por parte de los usuarios.

## 07 Testing
En esta clase analizamos las diferentes maneras y estrategias que tenemos para testear nuestra API, concentrandonos en test automatizados.

Para este fin, vimos como utilizar Postman y como escribirs tests para luego correrlos con un Runner. También vimos como utilizamos `newman` para poder correr los tests escritos desde la consola, exportando previamente el JSON de la colección.

Estas tareas prácticas se vieron reflejadas en el proyecto de API veterinaria que se encuentra en `04-express-ruteo/api-veterinaria`. Particularmente, encontraremos la colección de Postman a modo de documentación en `docs/postman/API Veterinaria - Docs.postman_collection.json`, y la colección con tests en `test/postman-test.json`. 

Para ejecutar los tests podemos correr el comando `npm test` (el servidor debe estar corriendo previamente)