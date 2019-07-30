//type Curried<A,B,C> = ( (a: A) => ( (b: B) => C ) )

//type UnCurried<A,B,C> = ( (a: A, b:B ) => C )


export function curry<A,B,C>(f: ( (a: A, b: B) => C )) : ( (a: A) => ( (b: B) => C ) ) {
  return (a: A) => ( (b: B) => f(a,b))
}

export function uncurry<A,B,C>(f: ( (a: A) => ( (b: B) => C ) )) : ( (a: A, b:B ) => C ) {
  return (a: A, b: B) => f(a)(b)
}
