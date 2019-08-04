import { print, list, empty, map } from '../types/list'



class Runner {
  public static main(): number {

    const l = list(1, list(2, list(3, list(4))))
    console.log(print(l))

    console.log(print(map(n => n*2, l)))

    return 0
  }

}

Runner.main()
