---
title: "Pandoc/Sigil "
description: "Com Millorar un ePub de Pandoc utilitzant Sigil"
category: web
tags: [pandoc, markdown, eines, sigil, epub]
last_modified_at: 2026-10-18
---


# Com Millorar un ePub de Pandoc utilitzant Sigil

El flux de treball que combina **Pandoc** (per a la conversió i automatització inicial) i **Sigil** (per al retoc visual i la fiabilitat final) és un dels més recomanats en la publicació digital professional.

Mentre que Pandoc genera una estructura neta a partir de fitxers Markdown, Sigil permet ajustar detalls visuals, enriquiri les metadades i assegurar la compatibilitat amb tots els lectors electrònics.

---

## 1. Configurar la Portada (*Cover Image*) de Forma Correcta

Tot i que Pandoc permet incloure una portada des de la terminal, molts lectors e-Ink (como Kindle o Kobo) o l'aplicació *Apple Books* requereixen propietats semàntiques concretes (`cover-image` al fitxer OPF) perquè es visualitzi bé a la biblioteca.

### Passos a Sigil:
1. Arrossega la imatge (`portada.jpg`) a la carpeta **Images** del navegador esquerre.
2. Fes clic dret sobre la imatge > **Afegeix una portada** (*Add Cover*).
3. Sigil generarà automàticament el fitxer HTML de la portada optimitzat i la marcarà com a portada oficial del paquet.

---

## 2. Afegir Salts de Pàgina Nets i Dividir Capítols

De vegades, Pandoc crea fitxers HTML interns molt grans o no talla els capítols exactament on és necessari (per exemple, abans d'una dedicatòria, un pròleg o un canvi de secció).

### Passos a Sigil:
* Col·loca el cursor del ratolí al punt del text on vols dividir el capítol.
* Prem `Cmd + Enter` (o ves a **Insereix > Break > Split at Cursor**).
* Sigil dividirà el fitxer en dos HTML independents immediatament, forçant un salt de pàgina net sense carregar fitxers massa pesats al lector.

---

## 3. Enriquir les Metadades (ISBN, Idioma, Drets, Publicació)

A Sigil pots revisar i ajustar fàcilment tots els camps normalitzats pel format ePub3.

### Passos a Sigil:
* Prem `F8` (o ves a **Herències > Editor de metadades**).
* Pots afegir i editar camps específics com:
  * **Language:** `ca` (Català)
  * **Identifier:** ISBN o UUID del llibre
  * **Publisher:** Nom de l'editorial o autor
  * **Rights:** Llicència (ex. *Creative Commons BY-NC*)

---

## 4. Refinar el Full d'Estil CSS

Pandoc aplica un CSS per defecte bastant generi, però sovint cal fer ajustos per a pantalles petites o tipografies específiques.

### Passos a Sigil:
1. Obre el fitxer `.css` dins de la carpeta **Styles**.
2. Ajusta regles pràctiques com aquestes:

```css
/* Eliminar el sagnat del primer paràgraf d'un capítol */
h1 + p, h2 + p {
    text-indent: 0 !important;
}

/* Assegurar que les imatges no surtin de la pantalla */
img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1em auto;
}

/* Centrar i ajustar els títols principals */
h1 {
    text-align: center;
    margin-top: 2em;
    margin-bottom: 1em;
}
```

---

## 5. Regenerar i Revisar la Taula de Continguts (TOC)

A vegades Pandoc inclou a l'índex títols que no haurien d'aparèixer (com el títol de la portada, agraïments o subtítols secundaris).

### Passos a Sigil:
1. Ves a **Herències > Genera la Taula de Continguts** (o prem `Cmd + T`).
2. Desmarca les caselles dels títols que **no vols** que apareguin a l'índex del lector o edita el text visible de cada entrada.

---

## 6. Validar l'ePub amb ePubCheck

Aquest és el pas més important abans de publicar. Moltes botigues de llibres (com Apple Books, Amazon KDP o Google Play) rebutjaran un ePub si té errors de sintaxi o etiquetes mal tancades.

### Passos a Sigil:
* Fes clic a la icona del **marcador verd** a la barra d'eines (o ves a **Herències > Valida l'ePub amb ePubCheck**).
* Si hi ha algun error de codi generat durant la conversió de Pandoc, Sigil indicarà la línia i el fitxer exactes per solucionar-ho immediatament.