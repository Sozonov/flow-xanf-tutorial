// @flow

// =============================== $PropertyType
type User = {
  name: string,
  age: number,
  wallet: {
    ammount: number,
    currency: 'USD' | 'EUR' | 'RUR'
  }
}
type Wallet = $PropertyType<User, 'wallet'>
const w1: Wallet = { ammount: 10, currency: 'USD' } // ok
//const w2: Wallet = { ammount: 10, currency: 'FOO' } // error

// =================================== $ElementType
function getField<O: *, F: string>(obj: O, field: F): $ElementType<O, F> {
  return obj[field]
}
const u: User = {
  name: 'Vasya',
  age: 14,
  wallet: { ammount: 10, currency: 'USD' }
}
const age = getField(u, 'age') // number
const name = getField(u, 'name') // string

type Coords = [number, number, string]
const x: $ElementType<Coords, 0> = 2 // number
const pointName: $ElementType<Coords, 2> = 'some name' // number
// const foo: $ElementType<Coords, 3> = 'some name' // error index out of bound

// ================================== $Call
function getConfig(name: string | number) {
  return { name, data: { tital: 10, page: 20 } }
}

type ConfigType = $Call<typeof getConfig, string>
let conf: ?ConfigType = { name: 'Vasya', data: { tital: 10, page: 20 } }

// ================================== Class
class Foo {
  static wallet = {
    amount: 10,
    currency: 'USD'
  }
}
type WalletType = $PropertyType<Class<Foo>, 'wallet'>
const wallet: WalletType = { amount: 6, currency: 'USD' }
