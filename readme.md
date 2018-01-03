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

## Видео 5

### Вызов функции сбрасывает уточнение типов

```
function logID({ id }: { id: string }) {}
if (u.id) {
  // u.id: string
  logID({ id: u.id })
  // u.id: string | void !!!
  u.id.includes('-')
}
```

Решение - сохранение id в переменную:

```
if (u.id) {
  const { id } = u
  logID({ id })
  id.includes('-')
}
```

### %checks

```
function ensureID(id: mixed): boolean %checks {
  return typeof id === 'string'
}
const { id } = u
if (ensureID(id)) {
  logID({ id })
  id.includes('-')
}
```

### Проверка, что в свиче проверили все варианты

В default пишем привидение к типу `empty` (cм video05.js)

## Видео 6. Disjoint unions

Disjoint - Это когда flow по значение одного (и только ОДНОГО!) поля может понять что за тип.
Для type refinement нужно юзать строгие типы, чтобы избежать проблемы [key: string] => mixed

## Видео 7. Классы

Классы являюся и типом и значением

## Видео 8. Structural vs Nominal typing

К типам применяется структурная типизация
К классам - номинальная

## Видео 9. Type variance

Нужно, чтобы класс потомок можно было юзать вместо родителя, а значит:
Но вход метода класса потомка мы МОЖЕМ принимать более общий тип, более конкретный тип НЕ МОЖЕМ.
Возвращать из метода класса потомка мы МОЖЕМ более конкретный тип, а более общий не можем
ковариантность - можно использовать более супертип
контрвариантность - можно использовать более подтип
инвариантность - ни поддип ни супертип использовать нельзя

Также тут интересный кейс, когда функция требует {name: ?string}, ей дают {name: string} - она недовольна. Лечится это добавлением "+" (ридонли)

## Видео 10. Generics

## Видео 11. Bounded polymorphism

```
function addUuid<T: { id: string }>(o: T): { ...$Exact<T>, uuid: string } {
  return { ...o, uuid: 'some-id-' + o.id }
}
```

`T: { id: string }` - ограничение на дженерик, требующее наличие поля id. Благодаря ему flow не ругается на выражение o.id
