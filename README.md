# NodePOP - api REST
<p align="center">

  <img alt="nodeJS" src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg">
</p>

Práctica del módulo de Backend Avanzado con NodeJS, Express y MongoDB de **KeepCoding**.

## Sobre la API

Esta API ha sido creada para el Bootcamp Web de KeepCoding. Consiste en un backend construido con Express, NodeJS y MongoDB.

Todas las consultas a los anuncios almacenados se pueden hacer mediante dos vias:
- Consultas directas por url, que devolveran una visa con los anuncios filtrados.
- Consultas a la api como servicio, que devolverá un fichero JSON.

### Parámetros de consulta

Ambas vías de consulta admiten los mismos parámetros. Un ejemplo de consulta seria:
```
://nombrededominio/api/anuncios?name=reloj&tags=lifestyle&type=venta&range=10-100&limit=3&skip=3&sort=nombre
```

Los parámetros aceptados son:
- **Name**: El nombre de un artículo. No distingue minúsculas de mayúsculas.
- **Tags**: El nombre de un tag o categoría.
- **Type**: Venta o Compra según el tipo de anuncio.
- **Range**: Precio mínimo y máximo separado por un guión.
- **Limit**: Número máximo de anuncios a devolver.
- **Skip**: Número de anuncios a saltar. En caso de paginación.
- **Sort**: Campo por el cuál queremos ordenar (nombre, precio). En negativo si querémos un orden descendente.

### New Release 11-2018

La api ha sido actualizada incluyendo diferentes mejroas. La versión anterior sigue disponible durante un tiempo, aunque se recomienda migrar a la versión nueva.

```
GET://nombrededominio/apiv2/anuncios?token=TOKEN&name=reloj&tags=lifestyle&type=venta&range=10-100&limit=3&skip=3&sort=nombre
```

Las mejoras incluidas son:

#### Seguridad de la API
Se ha securizado toda la API requiriendo un token de usuario para todas sus consultas. El token se puede obtener haciendo login a:

```
POST://nombrededominio/apiv2//apiv2/authenticate
```

Con un nombre de usuario y una contraseña valida en el body.

#### Internacionalización de la vista

La vista de anuncios se ha internacionalizado con el módulo `i18n`. El index renderiza la documentación, la cual esta pendiente de traducir.

#### Micro servicio de minificación de imagenes

La ruta de subida de anuncios a la api:

```
POST://nombrededominio/apiv2//apiv2/anuncios
```

Permite enviar un fichero de imagen en el campo foto. Si la api recibe esta imagen la guarda en el directorio de imagenes, guarda la ruta en la DB i hace lo mismo con su correspondiente thumbnail a traves de un microservicio creado en cote.


## Sobre su desarrollo

### Instalación

Para inciar la aplicación instala sus dependencias:
```shell
$ npm install
```

Con el módulo `dotenv` de node, las variables de entorno se cargan dinámicamente. Copia el archivo `.env.example` en `.env` y revisa los valores.

## Base de datos
Para inicializar la base de datos con documentos de prueba ejecuta:
```shell
$ npm run install-db
```

