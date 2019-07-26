import { curry, uncurry } from './functions/curry'

function sumAndStringify(a: number, b: number): string {
  return String(a+b)
}

class Runner {
  public static main(): number {
    const a: number = 1
    const b: number = 2
    console.log('Calling sumAndStringify(1,2)...')
    console.log(`Result: ${sumAndStringify(a,b)}`)

    console.log('Creating a curried version of sumAndStringify...')
    const curried = curry(sumAndStringify)
    console.log('Creating a partial function by calling curried(1)...')
    const partial1 = curried(1)
    console.log('Calling partial(2)...')
    console.log(`Result: ${partial1(2)}`)

    console.log('Uncurrying sumAndStringify...')
    const uncurried = uncurry(curried)
    console.log('Calling uncurried(1,2)')
    console.log(`Result: ${uncurried(1,2)}`)



    return 0
  }
}

Runner.main()
