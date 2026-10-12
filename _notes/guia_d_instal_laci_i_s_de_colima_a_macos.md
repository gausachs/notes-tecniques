---
layout: note
title: "Guia d'instalació de Colima"
description: "Configura un entorn de contenidors a macOS amb Colima, Docker i un script d’arrencada. Comandes i passos per tenir-ho a punt."
category: docker
tags: [colima,docker, devops, containers]
last_modified_at: 2026-10-12
---

# Guia d'Instal·lació i Configuració de Colima a macOS

Aquesta guia documenta el procés pas a pas per configurar un entorn de contenidors **Docker 100% Open Source** a macOS utilitzant **Colima** i la línia d'ordres de Docker, evitant les restriccions de llicència de Docker Desktop.

---

## 1. Requisits Previs

Asegura't de tenir instal·lat el gestor de paquets **Homebrew** al teu Mac. Si no el tens, el pots instal·lar amb:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

---

## 2. Instal·lació dels Paquets

Obre la terminal i executa la següent comanda per instal·lar la CLI de Docker, Docker Compose i el motor virtualitzat Colima:

```bash
brew install docker docker-compose colima
```

---

## 3. Script d'Arrencada Segura (`start-docker.sh`)

Per evitar possibles bloquejos amb les claus SSH o processos de virtualització penjats (especialment en xips Apple Silicon M1/M2/M3/M4), s'ha creat un script d'inicialització neta.

### Crear l'script

Crea un fitxer anomenat `start-docker.sh` amb el següent contingut:

```bash
cat << 'EOF' > start-docker.sh
#!/bin/bash

# Nom del script: start-docker.sh
# Descripció: Arrencada segura i neta de Colima a macOS

echo "🔍 Comprovant l'estat de Colima..."

# 1. Comprovar si ja està funcionant correctament
if colima status &>/dev/null; then
    echo "✅ Colima ja està funcionant correctament!"
    docker info | grep -E "Server Version|Operating System"
    exit 0
fi

# 2. Netejar possibles processos de Lima/Colima penjats en segon pla
echo "🧹 Netejant processos o sockets residus..."
pkill -9 -f colima &>/dev/null
pkill -9 -f limactl &>/dev/null
pkill -9 -f qemu-system &>/dev/null

# Petita pausa per assegurar que el sistema allibera els recursos
sleep 2

# 3. Arrencar Colima amb configuració segura i estable per a macOS
echo "🚀 Arrencant Colima amb la virtualització nativa de macOS (vz)..."

# Intenta arrencar amb el motor natiu VZ i suport Rosetta 2
colima start --vm-type=vz --vz-rosetta

# 4. Verificar si l'arrencada ha estat exitosa
if [ $? -eq 0 ]; then
    echo "🎉 Docker s'ha arrencar amb èxit!"
    echo "🐳 Versió del dimoni de Docker:"
    docker version --format 'Engine Version: {% raw %}{{.Server.Version}}{% endraw %}'
else
    echo "❌ S'ha produït un error en arrencar Colima."
    echo "💡 Consell: Si continua fallant, executa 'colima delete -f' i torna a provar."
fi
EOF
```

### Concedir permisos d'execució

Dona permisos d'execució al fitxer creat:

```bash
chmod +x start-docker.sh
```

---

## 4. Ús de l'Script i Comprovació

Per arrencar l'entorn de Docker en qualsevol moment, executa:

```bash
./start-docker.sh
```

### Comprovar el funcionament de Docker

Una vegada inicialitzat el servei, pots verificar que Docker respon correctament llançant un contenidor de prova:

```bash
docker run hello-world
```

---

## 5. Ordres de Manteniment Freqüents

| Acció | Comanda |
| :--- | :--- |
| **Arrencar servei (segur)** | `./start-docker.sh` |
| **Aturar Colima** | `colima stop` |
| **Veure l'estat del motor** | `colima status` |
| **Forçar l'eliminació de la VM (en cas de corrupció)** | `colima delete -f` |
| **Llistar contenidors en execució** | `docker ps` |
| **Netejar recursos no utilitzats** | `docker system prune -a` |
