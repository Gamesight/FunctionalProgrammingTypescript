import { curry, uncurry } from './functions/curry'
import { Opt, Some, None } from './types/option'
import { Either, Right, Left } from './types/either'
import { liftOpt, liftEither } from './functions/lift'

function sumAndStringify(a: number, b: number): string {
  return String(a+b)
}

// A wrapper function to ensure that Math.random() doesn't get evaluated
// to a constant during compilation
function getNextRandom(): number {
  return Math.random()
}

// A silly function to randomly generate a Left or a Right by
// throwing a meaningless error
function leftOrRight(): Either<Error, number> {
  try {
    const x = Math.random() - 0.5
    if ( x < 0 ) throw Error("Below zero error")
    return new Right(x * 100)
  }
  catch (e) {
    return new Left(e)
  }
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

    console.log('Uncurrying the curried function...')
    const uncurried = uncurry(curried)
    console.log('Calling uncurried(1,2)')
    console.log(`Result: ${uncurried(1,2)}`)


    const optList: Opt<number>[] = Array<number>(10).fill(0)
      .map(x => getNextRandom() - 0.5) // Map to a random number between -0.5 and 0.5
      .map(x => (x > 0) ? new Some<number>(x) : new None()) // Create Some(x) for positives, or None otherwise

    console.log("Creating random values between -0.5 and +0.5...\nBuilding array of None ")
    console.log("Mapping Some values to 1, and Nones to 0...")
    console.log(`Array: ${optList.map(liftOpt(x => 1)).map(x => x.getOrElse(0))}`)

    const eithList: Either<Error, number>[] = Array<number>(10).fill(0).map(x => leftOrRight())

    console.log("Mapping Rights to zero...\nFiltering out lefts...\nSumming...(result should be zero)")

    console.log(`Sum: ${
      eithList.map(liftEither(x => 0)).filter(x => x.isRight()).reduce((a,c) => a + c.get(), 0)
    }`)

    console.log('Getting the first left...')

    console.log(`First error: ${eithList.filter(x => x.isLeft())[0].get()}`)

    return 0
  }
}

Runner.main()
