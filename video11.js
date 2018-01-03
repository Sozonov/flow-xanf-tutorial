// @flow

// =========================================
function addUuid<T: { id: string }>(o: T): { ...$Exact<T>, uuid: string } {
  return { ...o, uuid: 'some-id-' + o.id }
}

type User = {
  id: string,
  name: string
}
const u: User = {
  id: '1',
  name: 'Vasya'
}

const r = addUuid(u)
console.log(`${r.uuid} - ${r.id} - ${r.name}`)
