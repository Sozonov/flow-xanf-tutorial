Код из уроков Ильи климова по FLOW
=================================
Ссылка на уроки: https://www.youtube.com/watch?v=9_GwX9O6DFE&list=PLvTBThJr861zvILAjREUakZ6E5l7h7lsZ




Видео 1
-------------------
Можно маппить файлы в типы
```
[options]
module.name_mapper='^\.\./svg-icons\/.*$' -> 'any'
```

Если запускать 
`flow-typed install -s` (с флагом -s), то будут установлены типы для либ из package.json, но не будут сгененеры заглушки.