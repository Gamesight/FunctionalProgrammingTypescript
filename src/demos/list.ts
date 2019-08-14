import { print, list, EMPTY, map, foldLeft, foldRight} from '../types/list'



class Runner {
  public static main(): number {

    const l = list(1, list(2, list(3, list(4))))
    console.log(print(l))

    console.log(print(map(n => n*2, l)))

    console.log(foldLeft(l, 0, (a,b) => a+b))
    console.log(foldRight(l, 0, (a,b) => a+b))

    return 0
  }

}

Runner.main()
