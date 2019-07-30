

export abstract class Either<A,B> {
  protected value: A | B
  protected constructor(value: A | B) {
    this.value = value
  }
  abstract get(): A | B
  abstract map<T>(f:(b: B) => T)
}

export class Left<A> extends Either<A,any> {
  constructor(a: A) {
    super(a)
  }
  get(): A {
    return this.value;
  }

  map<T>(f:(a: any) => T) {
    return this
  }
}

export class Right<B> extends Either<any,B> {
  constructor(b: B) {
    super(b)
  }

  map<T>(f:(b: B) => T) {
    return new Right<T>(f(this.value))
  }

  get(): B {
    return this.value
  }
}
