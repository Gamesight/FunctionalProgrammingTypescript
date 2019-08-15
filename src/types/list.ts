
type Empty = {
  type: 'Empty';
}

type Node<T> = {
  type: 'Node';
  head: T;
  tail: List<T>;
}

export type List<T> = Node<T> | Empty

type ListPattern<T, U> = {
  Empty: (e: Empty) => U; // base case
  Node: (n: Node<T>) => U;
}

function matcher<T,U>(p: ListPattern<T,U>): (l: List<T>) => U {
  // we are taking a ListPattern, and returning a function corresponding to the subtype
  return (l: List<T>) => p[l.type](l as any) //super annoying here
}

// A generic solution to the above pattern can be found:
// https://medium.com/@fillopeter/pattern-matching-with-typescript-done-right-94049ddd671c

export const EMPTY: Empty = {
    type: 'Empty'
  }

export function list<T>(head:T, tail:List<T> = EMPTY): List<T> {
  return {
    type: 'Node',
    head: head,
    tail: tail
  }
}

declare global {
  interface Array<T> {
    mkList(): List<T>
  }
}

Array.prototype['mkList'] = function<T>(): List<T> {
  if (this.length === 0) return EMPTY
  return list<T>(this[0], this.slice(1).mkList())
}


export function reverse<T>(l: List<T>, r: List<T> = EMPTY): List<T> {
  return matcher({
    Empty: e => r,
    Node: (n: Node<T>) => reverse(n.tail, list(n.head, r))
  })(l)
}

export function map<T,U>(f: (t: T) => U, l: List<T>): List<U> {
  return reverse(foldLeft<T, List<U>>(l, EMPTY, (t:T, out:List<U>) => list(f(t), out)))
}

export function print<T>(l: List<T>, s: string = ''): string {
  return matcher({
    Empty: e => '[' + ((s.length > 0) ? s.slice(1) : s) + ']',
    Node: (n: Node<T>) => print(n.tail, s + ',' + String(n.head))
  })(l)
}

export function foldLeft<T,U>(list: List<T>, z: U, f: (t: T, u: U) => U): U {
  return matcher({
    Empty: e => z,
    Node: (n: Node<T>) => foldLeft(n.tail, f(n.head, z), f)
  })(list)
}

export function foldRight<T,U>(list: List<T>, z: U, f: (t: T, u: U) => U): U {
  return matcher({
    Empty: e => z,
    Node: (n: Node<T>) => f(n.head, foldRight(n.tail, z, f))
  })(list)
}


/*
export function reverseByFoldLeft(l: List<T>, r: List<T> = EMPTY): List<T> {

}
*/
