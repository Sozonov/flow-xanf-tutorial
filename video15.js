// @flow

// =============================== $ObjMap
type promisesObject = {
  +[key: string]: Promise<mixed>
}

type ExtractPromiseTypeFn = <T>(x: Promise<T>) => T

async function props<P: *>(
  promisesObject: P
): Promise<$ObjMap<P, ExtractPromiseTypeFn>> {
  const promises = Object.values(promisesObject)
  const responses = await Promise.all(promises)
  const result = {}
  Object.keys(promisesObject).forEach((key, idx) => {
    result[key] = responses[idx]
  })
  return result
}

props({
  a: Promise.resolve(1),
  b: Promise.resolve('two'),
  c: Promise.resolve(false)
}).then(x => {
  const a: number = x.a
  const b: string = x.b
  const c: boolean = x.c
})

// =============================== $TuppleMap
