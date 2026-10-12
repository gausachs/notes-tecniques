---
layout: note
title: "Guia d'instalació PHP, MySQL i phpMyAdmin amb Docker Compose"
description: "Configura un projecte per desenvolupar amb php i MySQL amb contenidors."
category: docker
tags: [colima,docker, devops, containers]
last_modified_at: 2026-10-12
---


# Guia de Configuració: Entorn PHP, MySQL i phpMyAdmin amb Docker Compose

Aquest document resumeix el procés pas a pas per crear un entorn de desenvolupament web local complet utilitzant **Docker**, **Docker Compose** i **Colima** a macOS.

---

## 1. Estructura del Projecte

Tots els fitxers del projecte s'organitzen a la carpeta arrel `~/projecte-php`:

```text
projecte-php/
├── Dockerfile          # Recepta per a la imatge personalitzada de PHP + Apache
├── docker-compose.yml  # Orquestrador dels serveis (PHP, MySQL, phpMyAdmin)
└── src/                # Codi font de l'aplicació web (compartit amb el Mac)
    └── index.php       # Script de prova i connexió a la BDD
```

---

## 2. Fitxers de Configuració

### A. `Dockerfile` (Servidor PHP + Apache)
Aquest fitxer defineix la imatge personalitzada de PHP afegint-hi els mòduls i extensions necessàries per comunicar-se amb MySQL:

```dockerfile
FROM php:8.2-apache

# Instal·lar extensions de PHP per a MySQL
RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable mysqli

# Habilitar el mòdul mod_rewrite d'Apache
RUN a2enmod rewrite
```

---

### B. `docker-compose.yml` (Orquestració dels serveis)
Defineix els tres serveis, les xarxes internes, els ports i la persistència de dades:

```yaml
version: '3.8'

services:
  # Servei 1: Servidor Web + PHP
  web:
    build: .
    container_name: php_web
    ports:
      - "8080:80"
    volumes:
      - ./src:/var/www/html
    depends_on:
      - db

  # Servei 2: Base de Dades MySQL
  db:
    image: mysql:8.0
    container_name: mysql_db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: el_meu_db
      MYSQL_USER: usuari_php
      MYSQL_PASSWORD: contrasenya_secret
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

  # Servei 3: Interfície Visual phpMyAdmin
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: phpmyadmin_gui
    restart: always
    ports:
      - "8081:80"
    environment:
      PMA_HOST: db
      PMA_PORT: 3306
      MYSQL_ROOT_PASSWORD: root_password
    depends_on:
      - db

volumes:
  db_data:
```

---

### C. `src/index.php` (Fitxer de Prova)
Fitxer PHP per verificar el correcte funcionament de l'entorn i la connexió amb la base de dades MySQL:

```php
<?php
$host = 'db'; // Nom del servei MySQL definit al docker-compose.yml
$user = 'usuari_php';
$pass = 'contrasenya_secret';
$db   = 'el_meu_db';

echo "<h1>Hola des de PHP a Docker!</h1>";

// Prova de connexió a MySQL
$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo "<p style='color:red;'>❌ Error de connexió a MySQL: " . $conn->connect_error . "</p>";
} else {
    echo "<p style='color:green;'>✅ Connexió a la base de dades MySQL establerta amb èxit!</p>";
}
?>
```

---

## 3. Gestió i Execució de l'Entorn

> **Punt clau:** Cal executar les comandes de `docker compose` des de la carpeta arrel del projecte (`~/projecte-php`), on es troba el fitxer `docker-compose.yml`.

### Arrencar els serveis en segon pla
```bash
cd ~/projecte-php
docker compose up -d
```
*La bandera `-d` (*detached*) és essencial per evitar que la terminal es quedi bloquejada mostrant els registres (*logs*) dels contenidors.*

### Verificar l'estat dels contenidors
```bash
docker compose ps
```

### Veure els registres (*logs*) d'execució
```bash
docker compose logs -f
```

### Aturar l'entorn sense perdre dades
```bash
docker compose stop
```

### Eliminar els contenidors
```bash
docker compose down
```
*(Nota: Les dades de la base de dades MySQL es mantindran salvades gràcies al volum persistent `db_data`).*

---

## 4. Accessos des del Navegador

| Servei | URL | Credencials / Notes |
| :--- | :--- | :--- |
| **Aplicació Web PHP** | `http://localhost:8080` | Carrega directament el codi de `src/index.php` |
| **phpMyAdmin** | `http://localhost:8081` | **Servidor:** `db`<br>**Usuari:** `root` o `usuari_php`<br>**Contrasenya:** `root_password` o `contrasenya_secret` |