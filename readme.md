# Код из уроков Ильи климова по FLOW

Ссылка на уроки: https://www.youtube.com/watch?v=9_GwX9O6DFE&list=PLvTBThJr861zvILAjREUakZ6E5l7h7lsZ

## Видео 1

### Можно маппить файлы в типы

```
[options]
module.name_mapper='^\.\./svg-icons\/.*$' -> 'any'
```

### flow-typed

Если запускать
`flow-typed install -s` (с флагом -s), то будут установлены типы для либ из package.json, но не будут сгененеры заглушки.

### Плагин для eslint

flowtype - заставляет писать `// @flow` в начале файла

## Видео 2

## Видео 3

### Unsealed object

Небезопасное поведение

```
const config = {}
config.foo.toLowerCase() // не будет ошибки, а config.foo будет типа any
```

## Видео 4

### INTERSECTIONS + общие поля

Почему то не склеивает поле metadata

```
type NameType = {
  name: string,
  metadata: {
    originalName: string
  }
}
type HistoryType = {
  history: string[],
  metadata: {
    historyLimit: number
  }
}
type User = NameType & HistoryType
declare var u: User
u2.metadata.originalName = '12' // ok
u2.metadata.historyLimit = 12 // -> err
```

### Spread + нестрогий тип

Поля становятся maybe. К примеру u.name будет `string | null` вместо `string`

```
type UserType = {
    ...NameType,
    ...HistoryType,
}
declare var u: User
```

Происходит это из-за того, что по сути тип NameType выглядит так:

```
type NameType = {
  name: string,
  metadata: {
    originalName: string
  },
  [key: string]: mixed
}
```

Поэтому у примеру поле `history` в `HistoryType` имеет тип `string[]`, а в `NameType` - `mixed`

### Решение проблемы [key: string]: mixed в Spread

Нужно юзать $Exact, но чтобы объединить metadata нужно их отдельно спредить:

```
type UserType = {
    ...$Exact<NameType>,
    ...$Exact<HistoryType>,
     metadata: {
        ...$Exact<$PropertyType<NameType, 'metadata'>>,
        ...$Exact<$PropertyType<HistoryType, 'metadata'>>,
    }
}
```
