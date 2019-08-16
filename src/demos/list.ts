import { reverseByFoldLeft, mapLeft, map, foldLeft, foldRight, printL, printR} from '../types/list'



class Runner {
  public static main(): number {

    const l = [1,2,3,4].mkList()

    console.log(printR(l))
    console.log(printL(l))

    console.log(foldLeft(l, 0, (a,b) => a+b))
    console.log(foldRight(l, 0, (a,b) => a+b))

    console.log(printL(mapLeft(n => n*2, l)))
    console.log(printL(map(n => n*2, l)))

    console.log(printL(reverseByFoldLeft(l)))


    return 0
  }

}

Runner.main()
