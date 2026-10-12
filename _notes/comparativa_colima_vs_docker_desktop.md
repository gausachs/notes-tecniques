---
layout: note
title: "Comparativa: Colima vs Docker Desktop"
description: "Codima en front de Docker Desktop, pros i contras"
category: docker
date: 2026-10-12
tags: [docker, colima, macos, devops]
---

# Colima vs Docker Desktop

L'execució de contenidors Docker a macOS requereix una màquina virtual Linux intermèdia, ja que el nucli de macOS no admet contenidors de manera nativa. Tant **Colima** com **Docker Desktop** resolen aquest problema, però ho fan amb enfocaments i filosofies diferents.

---

## 📊 Taula Comparativa

| Característica | Colima | Docker Desktop |
| :--- | :--- | :--- |
| **Llicència / Cost** | Codi obert (MIT) / 100% Gratuït | Gratuït per a ús personal i PIMEs; de pagament per a grans empreses |
| **Interfície (UI)** | Línia de comandes (CLI) | Interfície gràfica (GUI) completa |
| **Consum de Recursos** | Molt baix i configurable | Mitjà / Alt |
| **Motor de Virtualització** | Lima (QEMU / VZ de macOS) | HyperKit / VZ framework |
| **Integració Kubernetes** | Sí (`colima start --kubernetes`) | Sí (activable des de preferències) |
| **Suport Arquitectura** | Intel (x86_64) i Apple Silicon (ARM64) | Intel (x86_64) i Apple Silicon (ARM64) |

---

## 🛠️ Colima

**Colima** és una eina de línia de comandes que utilitza **Lima** per iniciar una màquina virtual Linux lleugera a macOS i configurar-hi el dimoni de Docker.

### Avantatges:
* **Molt lleuger:** Baix consum de RAM i CPU en comparació amb solucions basades en GUI.
* **Sense restriccions de llicència:** Ideal per a entorns corporatius sense preocupar-se pels plans de pagament de Docker Inc.
* **Configuració flexible:** Permet assignar recursos exactes fàcilment per comanda o via fitxer de configuració.
* **Suport per a Kubernetes i Rancher:** Permet aixecar un ràpid clúster de Kubernetes amb un sol paràmetre.

### Desavantatges:
* No inclou interfície gràfica per defecte (cal utilitzar eines com Portainer o Lazydocker si es vol una GUI).

---

## 🐳 Docker Desktop

**Docker Desktop** és l'aplicació oficial de Docker Inc. per a Mac i Windows, dissenyada per oferir una experiència integradora fora de la caixa.

### Avantatges:
* **Interfície de usuari amigable:** Gestió visual de contenidors, volums, imatges, xarxes i meandres de logs.
* **Fàcil instal·lació:** Tot ve inclòs en un únic paquet instal·lable.
* **Extensions:** Permet afegir plugins i extensions directament a la interfície.

### Desavantatges:
* **Llicència comercial:** Requereix subscripció de pagament per a empreses de més de 250 treballadors o 10M$ d'ingressos.
* **Ús elevat de recursos:** Sol consumir més memòria RAM i bateria en segon pla.

---

## 🚀 Comandes ràpides per a Colima

```bash
# Instal·lació amb Homebrew
brew install colima docker

# Iniciar Colima amb paràmetres personalitzats
colima start --cpu 4 --memory 8

# Veure l'estat del servei
colima status

# Aturar el servei
colima stop
```

---

## 💡 Conclusió

* **Utilitza Colima** si vols un entorn de desenvolupament ràpid, extremadament lleuger, administrat per CLI i sense complicacions de llicències.
* **Utilitza Docker Desktop** si necessites un panell visual per inspeccionar contenidors i no tens restriccions de llicència al teu entorn laboral.