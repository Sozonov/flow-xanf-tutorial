// @flow

type User = {
  id?: string
}

// ===================================== уточнение типа
declare var u: User
// u.id: string | void
if (u.id) {
  // u.id: string
  u.id.includes('-')
}

//  ===================================== вызов функции сбрасывает type refinements
function logID({ id }: { id: string }) {}
if (u.id) {
  logID({ id: u.id })
  // u.id.includes('-') // error -> u.id: string | void
}

//  ===================================== решение сброса type refinements
if (u.id) {
  const { id } = u
  logID({ id })
  id.includes('-')
}

//  ===================================== %Checks
function ensureID(id: mixed): boolean %checks {
  return typeof id === 'string'
}
const { id } = u
if (ensureID(id)) {
  logID({ id })
  id.includes('-')
}

//  ===================================== Прием с empty
type AddAction = {
  type: 'add',
  data: string
}
type RemoveAction = {
  type: 'remove',
  idForRemove: string
}
type Action = AddAction | RemoveAction
function handleAction(action: Action) {
  switch (action.type) {
    case 'add':
      console.log(action.data)
      break
    case 'remove':
      console.log(action.idForRemove)
      break
    default:
      ;(action: empty)
      console.log('Не должны сюда входить')
  }
}
