

export abstract class Either<A,B> {
  protected value: A | B
  protected constructor(value: A | B) {
    this.value = value
  }
  //extending classes must implement the following methods
  abstract get() // returns the wrapped value
  abstract map<T>(f:(b: B) => T) // returns an Either, mapping the object if it is a Right
  abstract isRight(): boolean
  abstract isLeft(): boolean
}

export class Left<A> extends Either<A,any> {
  constructor(a: A) {
    super(a)
  }
  // Left always wraps an A, return it
  get(): A {
    return this.value;
  }
  // We do nothing with map, if it's a Left
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
  // Right always wraps a B, return it
  get(): B {
    return this.value
  }
  // Return a new Right, apply f to the value
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
