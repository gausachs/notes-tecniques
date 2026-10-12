# Notes tècniques

Web en català feta amb Jekyll i el tema Minima, amb estils personalitzats.

## Desenvolupament local

```sh
bundle install
bundle exec jekyll serve
```

## Contingut i estil

- `_notes/`: guies i apunts en Markdown.
- `assets/main.scss`: estils personalitzats.
- `_layouts/note.html`: plantilla de les notes.
- `index.md`: portada.

## GitHub Pages

Publicació des de la branca `main`, carpeta `/ (root)`, a Settings → Pages.
El valor `baseurl` de `_config.yml` ha de coincidir amb el nom del repositori,
per exemple `/notes-tecniques`. En local, visita aquesta mateixa ruta al servidor.
