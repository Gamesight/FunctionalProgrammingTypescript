

export abstract class Either<A,B> {
  protected value: A | B
  protected constructor(value: A | B) {
    this.value = value
  }
  abstract get()
  abstract map<T>(f:(b: B) => T)
  abstract isRight(): boolean
  abstract isLeft(): boolean
}

export class Left<A> extends Either<A,any> {
  constructor(a: A) {
    super(a)
  }

  get(): A {
    return this.value;
  }

  map<T>(f:(b: any) => T) {
    return this
  }

  isRight(): boolean {
    return false
  }

  isLeft(): boolean {
    return true
  }
}

export class Right<B> extends Either<any,B> {
  constructor(b: B) {
    super(b)
  }

  get(): B {
    return this.value
  }

  map<T>(f:(b: B) => T) {
    return new Right<T>(f(this.value))
  }


  isRight(): boolean {
    return true
  }

  isLeft(): boolean {
    return false
  }
}
