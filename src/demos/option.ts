import { Opt, Some, None } from '../types/option'
import { liftOpt, liftEither } from '../functions/lift'
//import { compose } from './functions/compose'

function sumAndStringify(a: number, b: number): string {
  return String(a+b)
}

// A wrapper function to ensure that Math.random() doesn't get evaluated
// to a constant during compilation
function getNextRandom(): number {
  return Math.random()
}


class Runner {
  public static main(): number {

    const optList: Opt<number>[] = Array<number>(10).fill(0)
      .map(x => getNextRandom() - 0.5) // Map to a random number between -0.5 and 0.5
      .map(x => (x > 0) ? new Some<number>(x) : new None()) // Create Some(x) for positives, or None otherwise

    console.log("Creating random values between -0.5 and +0.5...\nBuilding array of None ")
    console.log("Mapping Some values to 1, and Nones to 0...")

    console.log(`Array: ${optList.map(liftOpt(x => 1)).map(x => x.getOrElse(0))}`)

    return 0
  }

}

Runner.main()
