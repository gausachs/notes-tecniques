---
title: "Pandoc - comandes bàsiques"
description: "Qué és, com utilitzar-lo"
category: web
tags: [pandoc, markdown, eines, epub]
last_modified_at: 2026-10-17
---

# Manual Pràctic de Pandoc

**Pandoc** és un convertidor universal de documents de codi obert que funciona des de la línia d'ordres (terminal). És reconegut com la "ganiveta suïssa" de la conversió de formats de text.

---

## 1. Estructura bàsica d'una comanda

La sintaxi general de Pandoc segueix aquest esquema:

```bash
pandoc [fitxer_origen] -o [fitxer_desti] [opcions]
```

* **`fitxer_origen`**: El document que vols convertir.
* **`-o` / `--output`**: Especifica el nom i format del fitxer de sortida. Pandoc detecta el format de sortida automàticament per l'extensió del fitxer (`.epub`, `.pdf`, `.docx`, `.html`, etc.).

---

## 2. Opcions i paràmetres més utilitzats

* **`-f` / `--from`**: Especifica explícitament el format d'origen (ex: `-f markdown`).
* **`-t` / `--to`**: Especifica explícitament el format de sortida (ex: `-t epub`).
* **`-s` / `--standalone`**: Genera un document complet (amb la capçalera HTML, metadades, estructures de document, etc.) en lloc d'un fragment de codi.
* **`--toc` / `--table-of-contents`**: Genera automàticament una taula de continguts basada en els títols (`#`, `##`, etc.).
* **`--css=[fitxer.css]`**: Aplica un full d'estil CSS personalitzat (útil per a HTML i ePub).
* **`--metadata title="El meu títol"`**: Permet definir metadades directament des de la terminal.

---

## 3. Exemples pràctics de conversió

### A. De Markdown a ePub
Convertir un fitxer o llibre escrit en Markdown a un format ePub amb taula de continguts i estils:

```bash
pandoc llibre.md -o llibre.epub --toc --css=estils.css --metadata title="El meu llibre" --metadata author="Nom Autor"
```

> **Consell:** Si tens el llibre dividit en diferents fitxers (un per capítol), pots passar-los tots seguits:
> ```bash
> pandoc capitol1.md capitol2.md capitol3.md -o llibre_complet.epub --toc
> ```

---

### B. De Markdown a Word (`.docx`)
Per enviar un esborrany a algú que utilitzi Microsoft Word:

```bash
pandoc document.md -o document.docx
```

Si vols utilitzar un document de Word com a plantilla d'estils (fonts, marges, colors):
```bash
pandoc document.md -o document.docx --reference-doc=plantilla.docx
```

---

### C. De Word (`.docx`) a Markdown
Molt útil per "netejar" un document de Word i passar-lo a text pla:

```bash
pandoc document.docx -o resultat.md
```

---

### D. De Markdown a HTML
Generar una pàgina web HTML5 completa amb taula de continguts i CSS:

```bash
pandoc article.md -o article.html -s --toc --css=estil.css
```

---

### E. De Markdown a PDF
Per generar un PDF necessites tenir instal·lat un motor de PDF al sistema (com **LaTeX** o **Typst**):

```bash
# Utilitzant el motor per defecte (requereix LaTeX/pdflatex)
pandoc document.md -o document.pdf

# Utilitzant Typst (un motor modern i molt ràpid)
pandoc document.md -o document.pdf --pdf-engine=typst
```

---

## 4. Gestió de metadades amb YAML (Capçalera del fitxer)

En lloc de passar totes les metadades per la terminal, pots incloure un bloc **YAML** al principi del teu fitxer `.md`:

```yaml
---
title: "El meu llibre fantàstic"
author: "Nom Autor"
lang: "ca"
rights: "Creative Commons BY-SA"
---

# Capítol 1

Aquí comença el text del llibre...
```

En executar simplement `pandoc llibre.md -o llibre.epub --toc`, Pandoc utilitzarà automàticament el títol, l'autor i l'idioma definits a la capçalera.