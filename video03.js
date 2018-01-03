// @flow

// Объектный тип
type User = {
  name: string,
  age: number
}
const user: User = { name: 'Anton', age: 10 }
// user.someValue = 123 -> error

// exact
function save(user: User) {}
save({ name: 'Anton', age: 10, someValue: 12 })

type ExactUser = {|
  name: string,
  age: number
|}
function save2(user: ExactUser) {}
save2({ name: 'Anton', age: 10 }) // ok
// save2({ name: 'Anton', age: 10, someValue: 12 }) // err

// обязательные поля и ненулевые поля
type SomeType = {
  name: string,
  age: ?number
}
// const st1: SomeType = {name: 'Anton'} // error
const st2: SomeType = { name: 'Anton', age: null } // ok
type SomeType2 = {
  name: string,
  age?: number
}
const st3: SomeType2 = { name: 'Anton' } // ok

// Maps
type MapObj = {
  [key: string]: number
}
const m: MapObj = {}
m.foo = 123
// m.foo = '123' // err
type MapObj2 = {
  name: string,
  [key: string]: number
}
const m2: MapObj2 = { name: 'some name' }
m2.name = 'other name'
m2.foo = 123

// $call
const foo = () => {}
foo.dropCache = () => {}
type FooType = {
  dropCache: () => void,
  $call: (a: number) => number
}

declare var foo2: FooType
foo2(5)
foo2.dropCache()

// SEALED - UNSEALED
const config = { db: 'db', user: 'root' } // SEALED OBJECT
// config.foo = 'sad' -> error
const config2 = {} // UNSEALED OBJECT
config2.foo = 'bar' // ok
config2.baz.toLowerCase()
