---
layout: default
title: Inici
---

<section class="hero">
  <p class="eyebrow">El meu quadern de desenvolupament</p>
  <h1>Notes d'avui.<br>Solucions per demà.</h1>
  <p>Apunts, comandes i guies tècniques per tenir a mà allò que funciona. Un lloc on documentar, aprendre i tornar-hi.</p>
</section>

<section aria-labelledby="notes-title">
  <div class="section-heading">
    <h2 id="notes-title">Notes tècniques</h2>
    <span class="note-count">{{ site.notes | size }} {% if site.notes.size == 1 %}nota{% else %}notes{% endif %}</span>
  </div>
  <ul class="notes-grid">
    {% assign notes = site.notes | sort: 'title' %}
    {% for note in notes %}
    <li class="note-card">
      <span class="note-category">{{ note.category | default: 'Desenvolupament' | escape }}</span>
      <h3><a href="{{ note.url | relative_url }}">{{ note.title | escape }}</a></h3>
      {% if note.description %}<p>{{ note.description | escape }}</p>{% endif %}
      {% if note.tags.size > 0 %}
      <ul class="tags" aria-label="Etiquetes">
        {% for tag in note.tags %}<li>{{ tag | escape }}</li>{% endfor %}
      </ul>
      {% endif %}
    </li>
    {% endfor %}
  </ul>
</section>
