import { curry, uncurry } from './functions/curry'
import { Opt, Some, None } from './types/option'
import { Either, Right, Left } from './types/either'
import { liftOpt, liftEither } from './functions/lift'

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


    const optList: Opt<number>[] = []
    for (let i = 0; i < 10; i++) {
      const x = Math.random()*10
      optList.push( (x > 5) ? new Some<number>(x) : new None())
    }
    //optList.forEach(x => console.log(x))
    console.log(optList.length)

    console.log(optList.map(x => x.map(y => Math.ceil(y*10))).map(x => x.getOrElse(-1)))
    //optList.map(x => x.map(a => a*10)).map(x => x.getOrElse(-1)).forEach(x => console.log(x))

    const eithList: Either<Error, number>[] = []
    for (let i = 0; i < 10; i++) {
      try {
        const x = Math.random() - 0.5
        if ( x < 0 ) throw Error("Below zero error")
        eithList.push( new Right(x * 100) )
      }
      catch (e) {
        eithList.push(new Left(e))
      }
    }
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
