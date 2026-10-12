---
layout: note
title: "Què és Radicle? "
description: "Explicació planera , sense tecnicismes "
category: git
tags: [git, radicle, descentralització, p2p, devops, eines]
last_modified_at: 2026-10-12
---

Imagina't que vols guardar el codi de la teva web o les teves notes en un lloc segur per treballar-hi en equip. Normalment faries servir **GitHub**. Però, què passa si GitHub cau, decideix tancar el teu compte o comença a cobrar per coses que abans eren de franc? 

Aquí és on entra **Radicle**.

## 1. Què és Radicle en paraules senzilles?

> **Radicle és com un "GitHub" descentralitzat.** 

No depèn de cap empresa, de cap servidor central ni de cap núvol privat. En lloc de guardar el teu codi als servidors de Microsoft (propietària de GitHub), **el codi es guarda directament a l'ordinador dels propis desenvolupadors**.

Si un servidor de GitHub cau, ningú pot treballar. Amb Radicle, com que cada desenvolupador té una còpia exacta de tot el projecte i del seu historial, la xarxa no pot "caure" mai.

## 2. Com funciona? (Pas a pas)

Per entendre com funciona, pensa en com comparties música o pel·lícules abans (o com funciona la xarxa eMule / BitTorrent):

* **Instal·les l'eina:** Descarregues i instal·les el programa de Radicle a la teva terminal. Això converteix el teu ordinador en un "node" de la xarxa.
* **Crees la teva identitat digital:** En lloc de crear un compte amb correu i contrasenya, Radicle et crea una **clau d'identitat única** (com una signatura digital infalsificable). Tu ets l'únic propietari del teu compte.
* **Publiques el teu projecte:** Quan crees o actualitzes el teu projecte de codi (utilitzant el Git de tota la vida), Radicle el comparteix directament amb els teus companys d'ordinador a ordinador (*Peer-to-Peer* o P2P).
* **Col·labores sense intermediaris:** Les discussions, les revisions de codi i les millores es guarden directament al teu ordinador i se sincronitzen amb els teus companys quan esteu connectats.

## 3. Taula comparativa: GitHub vs Radicle

| Concepte | GitHub | Radicle |
| :--- | :--- | :--- |
| **Propietari** | Microsoft (Centralitzat) | Ningú / Els usuaris (Descentralitzat) |
| **On es guarda el codi?** | Als servidors als EUA | Al teu ordinador i al dels teus companys |
| **Identitat** | Usuari + Contrasenya | Clau criptogràfica (Signatura única) |
| **Censura / Bloqueig** | Et poden tancar el compte | Impossible de tancar o censurar |
| **Cost** | De franc amb límits / De pagament | Completament lliure i de codi obert |

## 4. Per què t'hauria d'interessar?

1. **Control total:** Tu ets el propietari absolut del teu codi i de les teves dades. Ningú et pot esborrar un repositori.
2. **Treball fora de línia (*Offline-first*):** Pots crear tasques, discutir canvis i revisar codi directament a la teva màquina sense estar connectat a Internet.
3. **Resistent a fallades:** Si no hi ha connexió a Internet global, pots continuar intercanviant codi amb els teus companys a través de la xarxa local.

## 5. Té algun inconvenient?

* **No és tan fàcil d'utilitzar com GitHub:** S'utilitza principalment des de la **línia de comandes (Terminal)**.
* **Manteniment de les dades:** Si tu apagues el teu ordinador i ets l'únic que té el projecte, ningú més hi podrà accedir fins que el tornis a engegar.