---
title: "Jekyll en local i a GitHub Pages: guia pas a pas"
description: "Crea un web de notes amb Jekyll, prova’l al Mac i publica’l a GitHub Pages. Inclou els estils, les rutes locals i el flux de commit i push."
category: web
tags: [jekyll, github, markdown, desplegament]
last_modified_at: 2026-10-12
---

Aquesta guia explica com crear un projecte com aquest des de zero en un Mac i com mantenir-lo un cop publicat. Els exemples fan servir el repositori `notes-tecniques` i l’usuari `gausachs`; substitueix-los pels teus si crees un altre web.

**Si ja treballes en aquest projecte, no cal recrear-lo:** ves directament als apartats 6 i 9.

## 1. Preparar el Mac

Necessites Git, Ruby, Bundler i un compte de GitHub. Homebrew permet instal·lar les eines. Si no el tens, segueix les instruccions de [Homebrew](https://brew.sh/).

Comprova les eines existents:

```bash
git --version
ruby -v
bundle -v
which ruby
```

Evita instal·lar Jekyll amb el Ruby del sistema de macOS. Utilitza un Ruby gestionat per una eina com rbenv; és també l’entorn utilitzat per aquest projecte. Consulta els requisits a la [guia oficial de Jekyll per a macOS](https://jekyllrb.com/docs/installation/macos/).

Si encara no tens aquest entorn:

```bash
xcode-select --install
brew install rbenv ruby-build
rbenv init
```

Si les eines de Xcode ja estan instal·lades, no cal repetir-ne la instal·lació. Segueix les indicacions de `rbenv init` per al teu terminal i obre una finestra nova.

Llista les versions disponibles i instal·la una versió compatible amb les dependències del projecte:

```bash
rbenv install -l
```

Aquest projecte s’ha compilat amb Ruby 3.3.1. Per a una instal·lació nova, tria una versió de manteniment actual de la branca compatible. A les ordres següents, substitueix `VERSIO` pel número escollit:

```bash
rbenv install VERSIO
rbenv global VERSIO
ruby -v
gem install bundler
bundle -v
```

`rbenv global` estableix la versió predeterminada del teu usuari. Si ja tens Ruby i Bundler funcionant, conserva l’entorn existent.

## 2. Crear la carpeta i les dependències

Per començar un projecte nou:

```bash
mkdir notes-tecniques
cd notes-tecniques
```

Crea un fitxer `Gemfile` amb aquest contingut:

```ruby
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
```

Aquesta és la dependència utilitzada en aquest web per treballar amb l’entorn de GitHub Pages. Instal·la les gems dins del projecte:

```bash
bundle config set --local path vendor/bundle
bundle install
```

Bundler generarà `Gemfile.lock`: conserva’l al repositori. Executa Jekyll amb `bundle exec` perquè utilitzi les dependències del projecte.

## 3. Configurar Jekyll i la col·lecció de notes

Crea `_config.yml`:

```yaml
title: Base de Coneixement Tècnica
description: Apunts, comandes i guies de desenvolupament
theme: minima
lang: ca
url: "https://gausachs.github.io"
baseurl: "/notes-tecniques"

header_pages: []

collections:
  notes:
    output: true
    permalink: /notes/:path/

defaults:
  - scope:
      path: ""
      type: notes
    values:
      layout: page

kramdown:
  input: GFM
  syntax_highlighter: rouge

exclude:
  - vendor
  - Gemfile
  - Gemfile.lock
  - README.md
```

La plantilla `page` existeix al tema Minima i serveix per començar. **En aquest projecte ja tenim una plantilla pròpia `_layouts/note.html` i el valor per defecte és `layout: note`.** No substitueixis la configuració existent si només vols afegir contingut.

`url` és el domini, sense el nom del repositori. `baseurl` és el prefix del projecte, amb barra inicial i sense barra final. En un repositori especial anomenat `USUARI.github.io`, que publica a l’arrel del domini, `baseurl` seria `""`.

## 4. Crear la portada i la primera nota

Crea la carpeta de documents:

```bash
mkdir -p _notes
```

Crea `_notes/primera-nota.md`:

```markdown
---
title: "La meva primera nota"
description: "Un exemple de document tècnic."
category: eines
tags: [terminal, desenvolupament]
last_modified_at: 2026-10-12
---

## Objectiu

Aquí escric els passos, les explicacions i les comandes.
```

El bloc inicial entre `---` és la capçalera YAML o *front matter*. Escriu-la al principi del fitxer. Les notes no necessiten una data al nom, a diferència de les entrades de `_posts/`.

Per a un projecte nou, crea `index.md` amb una portada mínima que llisti la col·lecció:

{% raw %}
```liquid
---
layout: default
title: Inici
---

# Notes tècniques

<ul>
  {% for note in site.notes %}
    <li><a href="{{ note.url | relative_url }}">{{ note.title | escape }}</a></li>
  {% endfor %}
</ul>
```
{% endraw %}

El filtre `relative_url` incorpora `baseurl`. En aquest projecte la portada ja mostra les notes automàticament en targetes: no cal editar-la cada vegada.

## 5. Afegir estils que realment es carreguin

Minima carrega `/assets/main.css`. Per personalitzar-lo, crea **`assets/main.scss`**:

```scss
---
---
@import "minima";

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #f7f8f2;
  color: #203b36;
}

a {
  color: #216750;
}
```

Les dues línies `---` fan que Jekyll processi el fitxer. La importació conserva els estils del tema i les regles posteriors els personalitzen.

En aquest web, l’error inicial era tenir l’estil a `assets/css/main.scss`, que genera una ruta diferent de la que carrega Minima. També hi havia un fitxer `_includes/_site/heat.html` que no s’incloïa en cap plantilla i apuntava a un CSS inexistent.

No editis `_site/assets/main.css`: `_site/` és el resultat generat i els canvis es perdran en reconstruir el web.

## 6. Arrencar el web en local i entendre les rutes

Des de la carpeta del projecte:

```bash
bundle exec jekyll serve
```

Amb `baseurl: "/notes-tecniques"`, obre:

[http://localhost:4000/notes-tecniques/](http://localhost:4000/notes-tecniques/)

Si visites només `http://localhost:4000/`, pots veure aquest missatge al terminal:

```text
ERROR '/' not found.
```

**Això no vol dir que la compilació hagi fallat:** estàs demanant l’arrel, però el web es publica sota `/notes-tecniques/`.

Si prefereixes treballar a l’arrel en local, atura el servidor amb `Ctrl+C` i executa:

```bash
bundle exec jekyll serve --baseurl ""
```

Ara obre [http://localhost:4000/](http://localhost:4000/). L’opció només afecta aquesta execució; no modifica `_config.yml` ni la configuració publicada.

Jekyll reconstrueix habitualment el contingut quan deses fitxers. Recarrega el navegador per veure els canvis. Si modifiques `_config.yml`, atura i torna a arrencar el servidor.

Per comprovar la compilació sense arrencar cap servidor:

```bash
bundle exec jekyll build
```

## 7. Preparar Git i crear el repositori a GitHub

Crea `.gitignore` abans del primer commit:

```gitignore
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata
.bundle/
vendor/
.DS_Store
.env
.env.*
```

Així publicaràs les fonts, sense les dependències instal·lades ni la sortida generada. Revisa sempre els fitxers abans de pujar-los; un repositori públic es pot consultar des d’Internet.

Inicialitza Git només si és un projecte nou:

```bash
git init -b main
git status
git add .
git diff --cached --stat
git commit -m "Crea el web de notes tècniques"
```

A GitHub:

1. Inicia sessió i entra a **New repository**.
2. Escriu `notes-tecniques` com a nom, o el nom que hagis triat.
3. Selecciona **Public** per seguir el mateix muntatge que aquest web.
4. Deixa desmarcada la creació de README, `.gitignore` i llicència: ja tens un projecte local.
5. Prem **Create repository**.

Connecta el repositori local amb el remot. Substitueix `USUARI` pel teu usuari:

```bash
git remote add origin https://github.com/USUARI/notes-tecniques.git
git push -u origin main
```

Si Git demana autenticació, utilitza un gestor de credencials, GitHub CLI autenticat o un token adequat; la contrasenya del compte no serveix com a contrasenya de Git per HTTPS. No escriguis tokens dins dels fitxers ni de la URL del remot.

**En aquest projecte `origin` ja està configurat:** no tornis a executar `git init` ni `git remote add origin`. Pots comprovar-lo amb `git remote -v`.

## 8. Activar GitHub Pages

Dins del repositori de GitHub:

1. Obre **Settings → Pages**.
2. A **Build and deployment → Source**, selecciona **Deploy from a branch**.
3. Selecciona la branca **main**.
4. Selecciona la carpeta **/ (root)**.
5. Prem **Save**.

GitHub construirà el web amb Jekyll. Pots seguir el resultat a **Actions**; espera que acabi correctament abans de comprovar la pàgina. Els detalls d’aquest mode de publicació són a la [documentació de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

En aquest projecte les adreces són:

- [Repositori: gausachs/notes-tecniques](https://github.com/gausachs/notes-tecniques).
- [Web publicat](https://gausachs.github.io/notes-tecniques/).

La publicació pot trigar uns minuts. No cal pujar `_site/` ni crear un fitxer `.nojekyll`: estem utilitzant el processament de Jekyll de GitHub Pages.

## 9. Afegir notes i publicar canvis

El flux habitual és:

1. Crea un `.md` dins de `_notes/`, amb la capçalera de l’apartat 4.
2. Escriu el contingut i desa’l.
3. Comprova el resultat al servidor local.
4. Compila, revisa els canvis, fes commit i push.

Per exemple:

```bash
bundle exec jekyll build
git status
git add _notes/la-meva-nota.md
git diff --cached
git commit -m "Afegeix una nova nota"
git push
```

Substitueix el nom del fitxer pel real. Si has modificat estils o plantilles, afegeix també aquests fitxers al commit.

**Desar en local no publica res.** El commit registra els canvis localment; el push els envia a GitHub. Quan arriben a `main`, GitHub Pages torna a construir el web. La nota apareixerà a la portada perquè aquesta recorre `site.notes`.

Per continuar des d’un altre ordinador:

```bash
git clone https://github.com/gausachs/notes-tecniques.git
cd notes-tecniques
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve --baseurl ""
```

Si ja tens una còpia local i no tens canvis pendents, pots posar-la al dia amb `git pull --ff-only` abans de començar.

## 10. Problemes habituals

| Símptoma | Comprovació o solució |
| --- | --- |
| `ERROR '/' not found` | Obre `/notes-tecniques/` o arrenca amb `--baseurl ""`. |
| La web es veu sense estil | Revisa `assets/main.scss`, la capçalera `---` i la ruta del CSS a la pàgina generada. |
| Un canvi a `_config.yml` no s’aplica | Reinicia `jekyll serve`. |
| Una nota no apareix | Revisa que sigui a `_notes/`, tingui capçalera YAML vàlida i estigui inclosa al commit i al push. |
| El web publicat no canvia | Comprova `git status`, la branca `main` i el desplegament a **Actions**. |
| `Could not locate Gemfile` | Executa l’ordre des de la carpeta arrel del projecte. |
| El port 4000 està ocupat | Atura l’altre servidor o usa `bundle exec jekyll serve --port 4001`; obre el mateix prefix al port 4001. |
| `remote origin already exists` | Comprova `git remote -v`; si el remot és correcte, només cal fer push. |
| Git rebutja el push perquè el remot té canvis | Revisa els canvis i sincronitza les branques; no facis un push forçat per resoldre-ho sense revisar. |

### Expressions Liquid dins dels exemples de codi

Jekyll processa Liquid fins i tot dins dels blocs de codi Markdown. Això afecta exemples de plantilles o comandes Docker que continguin claus dobles.

Per mostrar-les literalment, envolta el bloc d’exemple amb les etiquetes Liquid `raw` i `endraw`. Escrites amb entitats HTML perquè aquesta mateixa guia no les executi:

<pre><code>&#123;% raw %&#125;
&#123;&#123;.Server.Version&#125;&#125;
&#123;% endraw %&#125;</code></pre>

En el fitxer Markdown real s’escriuen amb claus normals, tal com es veuen a la pàgina. Aquesta guia utilitza el mateix mecanisme per mostrar el bucle de la portada sense executar-lo.

## Referències

- [Inici ràpid de Jekyll](https://jekyllrb.com/docs/).
- [Instal·lació de Jekyll a macOS](https://jekyllrb.com/docs/installation/macos/).
- [Crear un web amb Jekyll a GitHub Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll).
- [Configurar la branca de publicació](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
