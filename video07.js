// @flow

interface Loggable {
  log(level: string): string;
}

class Hello implements Loggable {
  foo: number
  bar: string = 'baz'

  constructor() {
    this.foo = 42
  }

  log = (level: string) => 'res'
}

const x: Hello = new Hello()
const log1: Loggable = x
const log2: Loggable = { log: (level: string) => 'res' }
