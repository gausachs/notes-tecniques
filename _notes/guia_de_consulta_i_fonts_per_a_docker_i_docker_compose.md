---
layout: note
title: "Guia de Referéncia Imatges per Docker"
description: "On trobar l'informació necesaria ?."
category: docker
tags: [colima,docker, devops, containers]
last_modified_at: 2026-10-12
---


# Guia de Referència: On trobar informació i documentació per a Docker

Aquest document recull les pautes, llocs web oficials i recursos necessaris per investigar, crear i configurar entorns de Docker de manera autònoma (sense dependre d'assistència externa).

---

## 1. On trobar les imatges oficials: Docker Hub

El directori principal per buscar qualsevol imatge de programari (PHP, MySQL, Node.js, Python, Nginx, Redis, etc.) és **Docker Hub**.

* **Lloc web oficial:** [hub.docker.com](https://hub.docker.com)
* **Com utilitzar-lo:**
  1. Utilitza el cercador superior per trobar el programari desitjat (per exemple, buscant `"php"` o `"mysql"`).
  2. Filtra preferentment per la etiqueta **"Official"** (Oficial) o **"Verified Publisher"** per garantir que la imatge és segura, està actualitzada i té suport oficial.

---

## 2. Com saber quines instruccions posar al `Dockerfile`

Cada imatge oficial a Docker Hub disposa d'una pàgina pròpia molt detallada que actua com a manual d'ús. 

Per saber com configurar-la, has de seguir aquests passos a la seva pàgina de Docker Hub:

1. **Llegir la secció "What is [Tecnologia]?":** Explica breument el propòsit de la imatge.
2. **Secció "How to use this image":** Mostra exemples pràctics de com arrencar-la amb `docker run` o incloure-la a un `docker-compose.yml`.
3. **Secció d'extensions o eines pròpies (com al cas de PHP):**
   * Moltes imatges oficials inclouen scripts auxiliars exclusius. 
   * Per exemple, la imatge oficial de PHP explica que no porta totes les extensions de base de dades instal·lades per defecte per estalviar espai, però proporciona una comanda pròpia anomenada `docker-php-ext-install` per afegir-les fàcilment al `Dockerfile`:
     ```dockerfile
     FROM php:8.2-apache
     RUN docker-php-ext-install mysqli pdo pdo_mysql
     ```

---

## 3. On consultar la sintaxi de Docker Compose

Quan necessitis afegir nous serveis, configurar xarxes avançades, volums o límits de memòria al fitxer `docker-compose.yml`, la referència tècnica absoluta és la documentació oficial de Docker.

* **Documentació de Compose:** [docs.docker.com/compose](https://docs.docker.com/compose/)
* **Guia de referència YAML:** Pots cercar directament *"Compose file reference"* per veure quins atributs estan permesos a cada versió (per exemple, `ports`, `environment`, `volumes`, `depends_on`, etc.).

---

## 4. Consell d'autonomia per a desenvolupadors

Si vols provar una tecnologia nova sense ajuda:
1. Entra a **Docker Hub**.
2. Cerca la imatge oficial.
3. Copia l'exemple bàsic de `docker-compose.yml` que proporcionen a la pestanya d'instruccions.
4. Adapta els ports o volums segons les necessitats del teu ordinador local.