// @flow

// ========================================= Generic. Базовый пример
type Response<T> = {
  success: boolean,
  entries: Array<T>,
  meta: {
    total: number,
    limit: number,
    offset: number
  }
}
type User = {
  name: string
}
const data: Response<User> = {
  success: true,
  entries: [{ name: 'Vasya' }],
  meta: {
    total: 10,
    limit: 2,
    offset: 0
  }
}
function withStatus<T>(a: T): {| data: T, status: boolean |} {
  return {
    data: a,
    status: true
  }
}
const r = withStatus(data)

// ========================================= Generic функции в функции
function extract<I, O>(func: (obj: I) => O, r: I): O {
  return func(r)
}
function cb(x: number) {
  return 'foo'
}
const s = extract(cb, 5)

// ========================================== Generic в классе
class Wrapper<O> {
  data: O
}
const wr: Wrapper<{ name: string }> = new Wrapper()
wr.data.name.includes('-')

// ===================================== Object map
type ObjectMap<T> = {
  [key: string]: T
}
const f: ObjectMap<number> = {}
f.foo = 1 // ok
// f.bar = 'baz' => error
