// @flow

// ============================== Пример на классах
class User {}
class Owner extends User {}
class Admin extends Owner {}

class BaseProcessor {
  getRelatedOwner(owner: Owner): Owner {
    return owner
  }
}

class ChildProcessor extends BaseProcessor {
  // input:  User <---(can) Owner (not)---> Admin  // ковариантность
  // output: User <---(not) Owner (can)---> Admin  // контрвариантность
  getRelatedOwner(owner: User): Admin {
    declare var o: Admin
    return o
  }
}

// ======================================
function logger(entity: { name: ?string }) {
  console.log(entity.name)
}
function loggerWithReadOnly(entity: { +name: ?string }) {
  console.log(entity.name)
}
type Entity = {
  name: string
}
const user: Entity = { name: 'Vasya' }
// logger(user) -> error
loggerWithReadOnly(user) // -> ok
