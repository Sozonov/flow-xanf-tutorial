// @flow

// ============================= Типы - структурные
type Foo = {
  name: string
}
type Bar = {
  name: string
}
declare var a: Foo
// при номинальной типизации в след строке была бы ошибка
// но во flow структурная типизация и т.к. по структуре эти типы одинаковы - все ок
const b: Bar = a

// ============================= Классы - номинальные
class Class1 {
  render = () => 42
}
class Class2 {
  render = () => 42
}
declare var c1: Class1
// const c2: Class2 = c1 -> error, т.к. для классов применяется номинальная типизация
