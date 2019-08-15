import { print, map, foldLeft, foldRight } from '../types/list'



class Runner {
  public static main(): number {

    const l = [1,2,3,4].mkList()

    console.log(print(l))

    console.log(foldLeft(l, 0, (a,b) => a+b))
    console.log(foldRight(l, 0, (a,b) => a+b))

    console.log(print(map(n => n*2, l)))


    return 0
  }

}

Runner.main()
