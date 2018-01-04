// @flow

// =============================== $Keys
const languages = {
  ru: 'ru.json',
  en: 'en.json',
  de: 'de.json'
}
type Language = $Keys<typeof languages>
const l1: Language = 'ru' // ok
//const l2: Language = 'foo' // err

// =============================== $Values
const colors = /*::Object.freeze(*/ {
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff'
} /*::)*/
type Color = $Values<typeof colors>
const c1: Color = '#ff0000' // ok
// const c2: Color = '#000000' // err

// =============================== $ReadOnly
type User = {
  name: string,
  age: number,
  wallet: {
    ammount?: number
  }
}
const logUser = (user: $ReadOnly<User>) => {
  //user.name = 'Valya'   // error
  user.wallet.ammount = 100 // ошибки нет, т.е. не делается глубокое readOnly
}

// =============================== $Shape
function updateUser(u: User, newData: $Shape<User>) {}
const user: User = { name: 'Vasya', age: 11, wallet: {} }
updateUser(user, { age: 12 }) // ok
//updateUser(user, { foo: 12 }) // error

// =============================== $Diff
type Pagination = {
  url: string,
  limit: number,
  offset: number,
  total: number
}
const defaultPaginationValues = {
  limit: 0,
  offset: 0
}
function createPagination(
  config: $Diff<Pagination, typeof defaultPaginationValues>
) {
  const actualConfig = {
    limit: 0,
    offset: 0,
    ...config
  }
}
createPagination({ url: 'foo', total: 100 }) // ok
createPagination({ url: 'foo', total: 100, limit: 1000 }) // ok
//createPagination({ url: 'foo' })    // err

// =============================== $Rest
type SomeUser = {|
  name: string,
  age: number,
  wallet: {
    ammount: number
  }
|}
const u: SomeUser = { name: 'Valya', age: 10, wallet: { ammount: 10 } }
type RestProps = $Rest<SomeUser, {| age: number |}>
const { age, ...otherProps } = u
const r: RestProps = otherProps
