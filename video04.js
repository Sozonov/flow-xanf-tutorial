// @flow

// UNION
type StatusType = 'success' | 'warning' | 'error'

// INTERSECTIONS
type NameType = {
  name: string
}
type HistoryType = {
  history: string[]
}
type User = NameType & HistoryType
declare var u: User
u.name
u.history

// INTERSECTIONS common fields
type NameType2 = {
  name: string,
  metadata: {
    originalName: string
  }
}
type HistoryType2 = {
  history: string[],
  metadata: {
    historyLimit: number
  }
}
type User2 = NameType2 & HistoryType2
declare var u2: User2
u2.metadata.originalName = '12'
// u2.metadata.historyLimit = 12   // тут почему то ошибка, не видит historyLimit, см. spread

// Spread
type User3 = {
  ...NameType2,
  ...HistoryType2
}
declare var u3: User3
// u3.name.toLowerCase() // error => name: string | mixed

// Spread + Exact
type User4 = {
  ...$Exact<NameType2>,
  ...$Exact<HistoryType2>,
  metadata: {
    ...$Exact<$PropertyType<NameType, 'metadata'>>,
    ...$Exact<$PropertyType<HistoryType, 'metadata'>>
  }
}
declare var u4: User4
u4.name.toLowerCase() // name: string
