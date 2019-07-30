
export abstract class Opt<T> {
  protected value: T;

  protected constructor(value: T | null) {
    this.value = value
  }

  public isEmpty(): boolean {
    return !this.isDefined()
  }

  abstract isDefined(): boolean

  public getOrElse(replacement:T): T {
    if (this.isEmpty()) return replacement
    else return this.value
  }

  abstract map<A>(f: (t: T) => A)
}

export class Some<T> extends Opt<T> {

  constructor(value: T) {
    super(value)
  }

  public isDefined(): boolean {
    return true
  }

  public get(): T {
    return this.value // issues here with mutating
  }

  public map<A>(f: (t: T) => A): Opt<A> {
    return new Some<A>(f(this.value))
  }
}

export class None extends Opt<any> {
  constructor() {
    super(null)
  }

  public map<A>(f: (t: any) => A) {
    return this
  }

  public isDefined(): boolean {
    return false
  }
}
