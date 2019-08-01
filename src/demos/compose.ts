//import { compose } from '../functions/compose'

//creates an n-length array filled with the value n
function compose1(n: number): number[] {
  return Array<number>(n).fill(n)
}

function compose2(arr: number[]): string[] {
  return arr.map(x => `${x}-string`)
}

class Runner {
  public static main(): number {

    //console.log(compose(compose1,compose2)(5))

    return 0
  }

}

Runner.main()
