type Curried<A,B,C> = ( (a: A) => ( (b: B) => C ) )

type UnCurried<A,B,C> = ( (a: A, b:B ) => C )

//const curry<A,B,C>: (u: UnCurried<A,B,C>) => Curried<A,B,C> =
export function curry<A,B,C>(f: ( (a: A, b:B) => C )) : ( (a: A) => ( (b: B) => C ) ) {
  return a => (b => f(a,b))
}

export function uncurry<A,B,C>(f: ( (a: A) => ( (b: B) => C ) )) : ( (a: A, b:B ) => C ) {
  return (a,b) => f(a)(b)
}
