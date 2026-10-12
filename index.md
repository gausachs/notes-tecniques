---
layout: default
title: Inici
---

<section class="hero">
  <p class="eyebrow">El meu quadern de desenvolupament</p>
  <h1>Notes d'avui.<br>Solucions per demà.</h1>
  <p>Apunts, comandes i guies tècniques per tenir a mà allò que funciona. Un lloc on documentar, aprendre i tornar-hi.</p>
</section>

<section id="notes" aria-labelledby="notes-title" data-note-browser>
  <div class="section-heading">
    <h2 id="notes-title">Notes tècniques</h2>
    <span class="note-count" data-note-count role="status" aria-live="polite">{{ site.notes | size }} {% if site.notes.size == 1 %}nota{% else %}notes{% endif %}</span>
  </div>
  <div class="tag-filters" data-tag-filters role="group" aria-label="Filtra les notes per etiqueta" hidden></div>
  <p data-empty-message hidden>No hi ha notes amb aquesta etiqueta. Selecciona «Totes» per veure-les.</p>
  <noscript><p>Activa JavaScript per filtrar les notes per etiqueta. A continuació es mostren totes les notes.</p></noscript>
  <ul class="notes-grid">
    {% assign notes = site.notes | sort: 'title' %}
    {% for note in notes %}
    <li class="note-card" data-note-tags="{{ note.tags | jsonify | escape }}">
      <span class="note-category">{{ note.category | default: 'Desenvolupament' | escape }}</span>
      <h3><a href="{{ note.url | relative_url }}">{{ note.title | escape }}</a></h3>
      {% if note.description %}<p>{{ note.description | escape }}</p>{% endif %}
      {% if note.tags.size > 0 %}
      <ul class="tags" aria-label="Etiquetes">
        {% for tag in note.tags %}<li><a data-tag-link href="{{ '/' | relative_url }}?tag={{ tag | uri_escape | escape }}#notes">{{ tag | escape }}</a></li>{% endfor %}
      </ul>
      {% endif %}
    </li>
    {% endfor %}
  </ul>
</section>

<script src="{{ '/assets/js/note-filters.js' | relative_url }}" defer></script>
