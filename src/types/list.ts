
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

export function empty(): Empty {
  return {
    type: 'Empty'
  }
}

export function list<T>(head:T, tail:List<T> = empty()): List<T> {
  return {
    type: 'Node',
    head: head,
    tail: tail
  }
}

export function reverse<T>(l: List<T>, r: List<T> = empty()) {
  return matcher({
    Empty: e => r,
    Node: n => reverse(n.tail, list(n.head, r))
  })(l)
}

export function map<T,U>(f: (t: T) => U, l: List<T>, m: List<U> = empty()): List<U> {
  return reverse(matcher({
    Empty: (e: Empty) => m,
    Node: (n: Node<T>) => map(f, n.tail, list(f(n.head), m))
  })(l))
}

export function print<T>(l: List<T>, s: string = ''): string {
  return matcher({
    Empty: e => '[' + s.slice(1) + ']',
    Node: n => print(n.tail, s + ',' + String(n.head))
  })(l)
}
