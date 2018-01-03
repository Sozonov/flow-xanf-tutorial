// @flow

// литеральный тип
let a: 2 = 2
let b: 'aa' = 'aa'

// union type
let status: 'success' | 'failure'
status = 'success'
let data: string | number
data = '1'
data = 1

// declare
declare var s: boolean
s = false

// maybe
let m: ?string
m = '1323'
m = null
if (m) {
  console.log(m.includes(''))
}

// functions
function func1(a: number): string {
  return a.toString()
}
const func2 = (a: number): string => a.toString()

// optional func params
const func3 = (a?: number): string => (a ? a.toString() : '')
func3()
func3(12)
// func3(12, 42) -> error

// rest
const func4 = (a: number, ...rest: Array<number>): string => a.toString()
func4(42, 11, 33)
// func4(52, true) -> error

// не юзаем тип Function !!!
function process(cb: Function) {}
// вместо этого указываем аргументы и возвращаемое значение
function process(cb: (err: Object) => void) {}

// массивы
let arr: Array<number> = [1, 2, 3]
let arr2: number[] = [1, 2, 3]
let arr3: (?number)[] = [1, 2, 3, null]
let arr4: (number | null)[] = [1, 2, 3, null]
let coords: [number, number, number] = [1, 2, 3] // определенная длина

// длина массива не чекается flow!
let arr5: string[] = []
console.log(arr5[99].includes('ad'))

// type allias
type PossibleStrings = string[]
let pt: PossibleStrings
