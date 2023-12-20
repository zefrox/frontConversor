# Frontend Conversor de UF a CLP

## Descripcion General

Proyecto desarollado en en angular 17.
El proyecto posee un login y una seccion donde se puede realizar la conversion de UF a CLP

El proyecto consume los siguiente servicios

- Login
- Conversor

Para poder acceder a la plataforma se usan dos usuarios

```bash
  username: user
  password: user
```

```bash
  username: admin
  password: admin
```

usuario "user" puede logearse y convertir uf.
usuario "admin" puede hacer lo mismo de "user" pero ademas puede ver historial de conversiones y exportar a XLS

## Instalacion e Iniciación

Luego descargar el codigo Fuente

Para instalar las dependencias ejecutar el siguiente comando

```bash
  npm i
```

Luego de instaladas, se ejecuta el siguiente comando para iniciar backend

```bash
  ng serve
```

Esté Fronted se conecta a backend por medio del puerto 3001

En caso de querer cambiar la url del backend favor dirigirse al archivo

```bash
  src/environments/environments.ts
```

## Servicios consumidos en la app

Hasta el momento se estan consumiendo estos servicios

```bash
  POST http://localhost:3001/api/auth/v1/login
  POST http://localhost:3001/api/conversor/v1
```

## Authors

- [Manuel Hernández Aravena](https://github.com/zefrox)
