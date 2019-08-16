
/*
 * A function compose<A,B,C> that takes two parameters
 * f: a function that maps A => B
 * g: a function that maps B => C
 * returns a function mapping A => C
 */

export function compose<A,B,C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C {
  return (a: A) => g(f(a))
}
