import { curry, uncurry } from '../functions/curry'
import { Either, Right, Left } from '../types/either'
import { liftOpt, liftEither } from '../functions/lift'

function sumAndStringify(a: number, b: number): string {
  return String(a+b)
}

// A silly function to randomly generate a Left or a Right by
// throwing a meaningless error
function leftOrRight(): Either<Error, number> {
  try {
    const x = Math.random() - 0.5
    if ( x < 0 ) throw Error("Below zero error")
    return new Right(1)
  }
  catch (e) {
    return new Left(e)
  }
}

class Runner {
  public static main(): number {

    const eithList: Either<Error, number>[] = Array<number>(10).fill(0).map(x => leftOrRight())

    console.log("Mapping Rights to zero...\nFiltering out lefts...\nReducing...(result should be a string of 2s)")

    console.log(`Ouput: ${
      eithList.map(
        liftEither(
          curry(sumAndStringify)(1)
        )
      ).filter(x => x.isRight()).reduce((a,c) => a + c.get(), "")
    }`)

    console.log('Getting the first left...')

    console.log(`First error: ${eithList.filter(x => x.isLeft())[0].get()}`)

    return 0
  }

}

Runner.main()
