# Next.js Teslo Sshop

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- El -d, significa **detached**

* MondoDB URL Local:

```
mongodb://localhost:27017/teslodb
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

## LLenar la base de datos con informacion de pruebas

LLama:

```
 http://localhost:3000/api/seed
```
