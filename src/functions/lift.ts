import { Opt, Some, None } from '../types/option'
import { Either } from '../types/either'

export function liftOpt<A,B>(f: (a:A) => B): (a: Opt<A>) => Opt<B> {
  return (a: Opt<A>) => a.map(x => f(x))
}

export function liftEither<A,B,C>(f: (b:B) => C): (a: Either<A,B>) => Either<A,C> {
  return (a: Either<A,B>) => a.map(x => f(x))
}
